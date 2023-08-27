package com.ibermatica.oralockbg.service.impl;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.exception.OobException;
import com.ibermatica.oralockbg.mapper.UserMapper;
import com.ibermatica.oralockbg.model.Schema;
import com.ibermatica.oralockbg.model.User;
import com.ibermatica.oralockbg.repository.SchemaRepository;
import com.ibermatica.oralockbg.repository.UserRepository;
import com.ibermatica.oralockbg.service.MessageService;
import com.ibermatica.oralockbg.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SchemaRepository schemaRepository;
	
	@Autowired
	private MessageService messageService;	
	
	@Autowired
	private UserMapper userMapper;

	@Override
	public List<UserDto> getAll(String search, String sort, String dir) {
		if(search!=null && !"".equals(search)) {
			return userMapper.toDtoList(userRepository.findByIdContainingIgnoreCaseOrNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search, search));
		} else {
			Iterable<User> iterable = userRepository.findAll();
			List<UserDto> result = userMapper.toDtoList(StreamSupport
					  .stream(iterable.spliterator(), false)
					  .collect(Collectors.toList()));
			return sort(result, sort, dir);
		}
	}
	
	private List<UserDto> sort(List<UserDto> users, String sort, String dir) {
		switch(sort) {
		case "id": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparing(UserDto::getId)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparing(UserDto::getId).reversed()).collect(Collectors.toList());
		case "name": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparing(UserDto::getName)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparing(UserDto::getName).reversed()).collect(Collectors.toList());
		case "email": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparing(UserDto::getEmail)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparing(UserDto::getEmail).reversed()).collect(Collectors.toList());
		case "role": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparing(UserDto::getRole)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparing(UserDto::getRole).reversed()).collect(Collectors.toList());
		case "enabled": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparing(UserDto::getEnabled)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparing(UserDto::getEnabled).reversed()).collect(Collectors.toList());
		case "disabled": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparing(UserDto::getDisabled)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparing(UserDto::getDisabled).reversed()).collect(Collectors.toList());
		case "countLocks": return "asc".equals(dir) 
				? users.stream().sorted(Comparator.comparingInt(UserDto::getCountLocks)).collect(Collectors.toList())
						: users.stream().sorted(Comparator.comparingInt(UserDto::getCountLocks).reversed()).collect(Collectors.toList());		
		default: return users;
		}
	}

	@Override
	public UserDto getById(String id) {
		return userMapper.toDto(userRepository.findOne(id));
	}

	@Override
	public UserDto save(UserDto user, User currentUser) {
		if(!user.getId().equalsIgnoreCase(currentUser.getId()) && !currentUser.getRoleClass().getAdmin()) {
			// do not have permissions to create/modify other users
			throw new OobException(messageService.getMessage("error.no-allowed-modify-user", currentUser));
		}		
		user.setId(user.getId().toUpperCase()); 
		Schema s = schemaRepository.findOne(user.getId());
		if(s == null) {
			// not registered as an oracle db user
			throw new OobException(String.format(messageService.getMessage("error.user-no-db", currentUser), user.getId()));
		}
		User u = userRepository.findOne(user.getId());
		if(u == null) {
			user.setEnabled(new Date());
			user.setDisabled(null);
		}
		u = userMapper.toEntity(user);
		return userMapper.toDto(userRepository.save(u));
	}

	@Override
	public UserDto disable(String id, User currentUser) {
		if(!currentUser.getRoleClass().getAdmin()) {
			// not have permissions to disable users
			throw new OobException(messageService.getMessage("error.no-allowed-disable-user", currentUser));
		}
		User u = userRepository.findOne(id);
		if(u != null && u.getDisabled() == null) {
			u.setDisabled(new Date());
			u = userRepository.save(u);
		}
		return userMapper.toDto(u);
	}

	@Override
	public UserDto enable(String id, User currentUser) {
		if(!currentUser.getRoleClass().getAdmin()) {
			// not have permissions to activate users
			throw new OobException(messageService.getMessage("error.no-allowed-enable-user", currentUser));
		}		
		User u = userRepository.findOne(id);
		if(u != null && u.getDisabled() != null) {
			u.setDisabled(null);
			u = userRepository.save(u);
		}
		return userMapper.toDto(u);
	}

}
