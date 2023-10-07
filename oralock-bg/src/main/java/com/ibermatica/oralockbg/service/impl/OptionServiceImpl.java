package com.ibermatica.oralockbg.service.impl;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ibermatica.oralockbg.dto.OptionsDTO;
import com.ibermatica.oralockbg.exception.OobException;
import com.ibermatica.oralockbg.model.ObjectType;
import com.ibermatica.oralockbg.model.Operation;
import com.ibermatica.oralockbg.model.Option;
import com.ibermatica.oralockbg.model.RegisteredSchema;
import com.ibermatica.oralockbg.model.Schema;
import com.ibermatica.oralockbg.model.User;
import com.ibermatica.oralockbg.repository.ObjectTypeRepository;
import com.ibermatica.oralockbg.repository.OperationRepository;
import com.ibermatica.oralockbg.repository.OptionRepository;
import com.ibermatica.oralockbg.repository.RegisteredSchemaRepository;
import com.ibermatica.oralockbg.repository.SchemaRepository;
import com.ibermatica.oralockbg.service.MessageService;
import com.ibermatica.oralockbg.service.OptionService;

@Service
public class OptionServiceImpl implements OptionService {
	
	@Autowired
	private OptionRepository optionRepository;
	
	@Autowired
	private RegisteredSchemaRepository registeredSchemaRepository;
	
	@Autowired
	private SchemaRepository schemaRepository;	

	@Autowired
	private ObjectTypeRepository objectTypeRepository;
	
	@Autowired
	private OperationRepository operationRepository;	
	
	@Autowired
	private MessageService messageService;		
	
	@Override
	public Option findById(String id) {
		return optionRepository.findOne(id);
	}

	@Override
	@Transactional
	public void save(OptionsDTO options, User currentUser) {
		// pre-validations
		validate(options, currentUser);
		// options
		for(Option opt: options.getOptions()) {
			Option o = optionRepository.findOne(opt.getId());
			o.setValue(opt.getValue());
			optionRepository.save(o);
		}
		// schemas
		registeredSchemaRepository.deleteAll();
		for(String schema: options.getSchemas()) {
			registeredSchemaRepository.save(new RegisteredSchema(schema));
		}
		// types
		Iterable<ObjectType> types = objectTypeRepository.findAll();
		Iterator<ObjectType> iteratorTypes = types.iterator();
		while(iteratorTypes.hasNext()) {
			ObjectType ot = iteratorTypes.next();
			ot.setActive(options.getTypes().contains(ot.getId()));
			objectTypeRepository.save(ot);
		}
		// operations
		Iterable<Operation> ops = operationRepository.findAll();
		Iterator<Operation> iteratorOps = ops.iterator();
		while(iteratorOps.hasNext()) {
			Operation op = iteratorOps.next();
			op.setLog(options.getOps().contains(op.getId()));
			operationRepository.save(op);
		}		
		 
	}
	
	private void validate(OptionsDTO options, User currentUser) {		
		// currentUser is admin?
		if(!currentUser.getRoleClass().getAdmin()) {
			// not have permissions to modify system options
			throw new OobException(messageService.getMessage("error.no-allowed-modify-options", currentUser));
		}
		// Schema has locked objects?
		List<Schema> schemasToRemove = schemaRepository.findByUsernameNotIn(options.getSchemas());
		for(Schema schema: schemasToRemove) {
			if(schema.getCountLocks() > 0) {
				throw new OobException(String.format(messageService.getMessage("error.schema-with-locks", currentUser), schema.getUsername()));
			}
		}
		// There are locked objects of type?
		List<ObjectType> typesToRemove = objectTypeRepository.findByIdNotIn(options.getTypes());
		for(ObjectType type: typesToRemove) {
			if(type.getCountLocks() > 0) {
				throw new OobException(String.format(messageService.getMessage("error.type-with-locks", currentUser), type.getId()));
			}
		}
	}

}
