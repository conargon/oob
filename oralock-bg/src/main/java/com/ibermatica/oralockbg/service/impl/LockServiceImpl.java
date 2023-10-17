package com.ibermatica.oralockbg.service.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.exception.GenericJDBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ibermatica.oralockbg.common.Constants;
import com.ibermatica.oralockbg.dto.LockDto;
import com.ibermatica.oralockbg.exception.OobException;
import com.ibermatica.oralockbg.mapper.LockMapper;
import com.ibermatica.oralockbg.model.Lock;
import com.ibermatica.oralockbg.model.ObjectLog;
import com.ibermatica.oralockbg.model.ObjectType;
import com.ibermatica.oralockbg.model.Operation;
import com.ibermatica.oralockbg.model.User;
import com.ibermatica.oralockbg.repository.LockRepository;
import com.ibermatica.oralockbg.repository.ObjectLogRepository;
import com.ibermatica.oralockbg.repository.ObjectTypeRepository;
import com.ibermatica.oralockbg.repository.OperationRepository;
import com.ibermatica.oralockbg.service.LockService;
import com.ibermatica.oralockbg.service.MessageService;

@Service
public class LockServiceImpl implements LockService {
	
	@Autowired
	private LockRepository lockRepository;
	
	@Autowired
	private ObjectLogRepository objectLogRepository;
	
	@Autowired
	private OperationRepository operationRepository;
	
	@Autowired
	private ObjectTypeRepository objectTypeRepository;
		
	@Autowired
	private LockMapper lockMapper;	
	
	@Autowired
	private MessageService messageService;

	@Override
	@Transactional
	public LockDto save(LockDto lockDto, User currentUser) {	
		ObjectType ot = objectTypeRepository.findOne(lockDto.getType());
		if(ot == null || Boolean.FALSE.equals(ot.getActive())) {
			throw new OobException(String.format(messageService.getMessage("error.lock.type.no-active", currentUser), lockDto.getType()));
		}
		try {
			Lock lock = new Lock();
			lock.setType(lockDto.getType());
			lock.setOwner(lockDto.getOwner());
			lock.setName(lockDto.getName());
			lock.setUser(currentUser.getId());
			lock.setUsername(currentUser.getName());
			lock.setDate(new Date());
			lock.setComment(lockDto.getComment() != null && !"".equals(lockDto.getComment()) ? lockDto.getComment() : "------");
			lock.setRef(lockDto.getRef());
			LockDto result = lockMapper.toDto( lockRepository.save(lock) );
			
			Operation op = operationRepository.findOne(Constants.OP_LOCK);
			if(op.getLog()) {
				ObjectLog log = new ObjectLog();
				log.setType(result.getType());
				log.setOwner(result.getOwner());
				log.setName(result.getName());
				log.setUser(currentUser.getId());
				log.setDate(new Date());
				log.setComment(result.getComment());
				log.setRef(result.getRef());
				log.setIdOperation(Constants.OP_LOCK);
				objectLogRepository.save(log);
			}
			
			return result;
		} catch(Exception e) {
			throw new OobException(getMessageException(e), e);
		}
	}

	@Override
	@Transactional
	public void delete(Integer id, User currentUser) {
		Lock lock = lockRepository.findOne(id);		
		if(lock!=null) {
			try {
				if(!lock.getUser().equalsIgnoreCase(currentUser.getId()) && !currentUser.getRoleClass().getAdmin()) {
					throw new OobException(String.format(messageService.getMessage("error.locked-by-other", currentUser), lock.getUser()));
				}
				//
				Operation op = operationRepository.findOne(Constants.OP_UNLOCK);
				if(op.getLog()) {				
					ObjectLog log = new ObjectLog();
					log.setType(lock.getType());
					log.setOwner(lock.getOwner());
					log.setName(lock.getName());
					log.setUser(currentUser.getId());
					log.setDate(new Date());
					log.setComment(lock.getComment());
					log.setRef(lock.getRef());
					log.setIdOperation(Constants.OP_UNLOCK);
					objectLogRepository.save(log);
				}
				//
				lockRepository.delete(lock);
			} catch(Exception e) {
				throw new OobException(getMessageException(e), e);
			}
		}
	}	

	@Override
	public List<LockDto> getAll(User currentUser) {
		try {
			return lockMapper.toDtoList( lockRepository.findAllLocksByUser(currentUser.getId()) );
		} catch (Exception e) {
			throw new OobException(getMessageException(e), e);
		}
	}

	private String getMessageException(Exception e) {
		if(e.getCause() instanceof GenericJDBCException) {
			GenericJDBCException gje = (GenericJDBCException)e.getCause();
			return gje.getSQLException().getMessage();
		} else {
			return e.getMessage();
		}
	}
	
}
