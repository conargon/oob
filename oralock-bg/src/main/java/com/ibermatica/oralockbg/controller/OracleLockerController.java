package com.ibermatica.oralockbg.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibermatica.oralockbg.dto.LockDto;
import com.ibermatica.oralockbg.dto.ObjectLogDto;
import com.ibermatica.oralockbg.dto.ObjectTypeDto;
import com.ibermatica.oralockbg.dto.OptionsDTO;
import com.ibermatica.oralockbg.dto.OracleObjectDto;
import com.ibermatica.oralockbg.dto.RoleDto;
import com.ibermatica.oralockbg.dto.TranslationDto;
import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.model.Option;
import com.ibermatica.oralockbg.model.RegisteredSchema;
import com.ibermatica.oralockbg.model.Schema;
import com.ibermatica.oralockbg.service.AuthenticateService;
import com.ibermatica.oralockbg.service.LockService;
import com.ibermatica.oralockbg.service.ObjectLogService;
import com.ibermatica.oralockbg.service.ObjectTypeService;
import com.ibermatica.oralockbg.service.OptionService;
import com.ibermatica.oralockbg.service.OracleObjectService;
import com.ibermatica.oralockbg.service.RegisteredSchemaService;
import com.ibermatica.oralockbg.service.RoleService;
import com.ibermatica.oralockbg.service.SchemaService;
import com.ibermatica.oralockbg.service.TranslationService;
import com.ibermatica.oralockbg.service.UserService;

@RestController
@RequestMapping("/olc/api/v1.0")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("isAuthenticated()")
public class OracleLockerController {
	
	@Autowired
	private SchemaService schemaService;

	@Autowired
	private OracleObjectService oracleObjectService;

	@Autowired
	private LockService lockService;

	@Autowired
	private ObjectTypeService objectTypeService;
		
	@Autowired
	private ObjectLogService objectLogService;
	
	@Autowired
	private TranslationService translationService;	
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RegisteredSchemaService registeredSchemaService;
	
	@Autowired
	private AuthenticateService authenticateService;
	
	@Autowired
	private OptionService optionService;
	
	@GetMapping("/schemas")
	public List<Schema> getSchemas() {
		return schemaService.getAll();
	}	
	
	@GetMapping("/objects")
	public List<OracleObjectDto> getObjects(@RequestParam("owner") String owner, @RequestParam("type") String type, @RequestParam("name") String name, @RequestParam("user") String user,
			@RequestParam("sort") String sort, @RequestParam("dir") String dir) {
		return oracleObjectService.find(owner, type, name, user, sort, dir);
	}
	
	@GetMapping("/logs")
	public List<ObjectLogDto> getObjectLogs(@RequestParam("owner") String owner, @RequestParam("type") String type, @RequestParam("name") String name,
			@RequestParam("sort") String sort, @RequestParam("dir") String dir) {
		return objectLogService.find(owner, type, name, sort, dir);
	}
		
	@GetMapping("/objectTypes")
	public List<ObjectTypeDto> getObjectTypes() {
		return objectTypeService.getAll();
	}

	@GetMapping("/locks")
	public List<LockDto> getLocks(@RequestHeader (name="Authorization") String authorization) {
		return lockService.getAll(authenticateService.getCurrentUser(authorization));
	}
	
	@PutMapping("/locks")
	public LockDto saveLock(@Valid @RequestBody LockDto lock, @RequestHeader (name="Authorization") String authorization) {
		return lockService.save(lock, authenticateService.getCurrentUser(authorization));
	}
	
	@DeleteMapping("/locks/{id}")
	public void deleteLock(@PathVariable("id") Integer id, @RequestHeader (name="Authorization") String authorization) {
		lockService.delete(id, authenticateService.getCurrentUser(authorization));
	}	
		
	@GetMapping("/translations")
	public List<TranslationDto> getTranslations(@RequestParam("lang") String lang) {
		return translationService.getTranslationList(lang);
	}
	
	@GetMapping("/roles")
	public List<RoleDto> getRoles() {
		return roleService.getAll();
	}
	
	@GetMapping("/users")
	public List<UserDto> getUsers(@RequestParam(name="search", required=false) String search, @RequestParam("sort") String sort, @RequestParam("dir") String dir) {
		return userService.getAll(search, sort, dir);
	}
	
	@GetMapping("/user/{id}")
	public UserDto getUser(@PathVariable("id") String id) {
		return userService.getById(id);
	}
	
	@PutMapping("/user")
	public UserDto saveUser(@Valid @RequestBody UserDto user, @RequestHeader (name="Authorization") String authorization) {
		return userService.save(user, authenticateService.getCurrentUser(authorization));
	}
	
	@DeleteMapping("/user/{id}")
	public UserDto disableUser(@PathVariable("id") String id, @RequestHeader (name="Authorization") String authorization) {
		return userService.disable(id, authenticateService.getCurrentUser(authorization));
	}	
	
	@PostMapping("/user/{id}")
	public UserDto enableUser(@PathVariable("id") String id, @RequestHeader (name="Authorization") String authorization) {
		return userService.enable(id, authenticateService.getCurrentUser(authorization));
	}	
	
	@GetMapping("/registeredSchemas")
	public List<RegisteredSchema> geRegisteredSchemas() {
		return registeredSchemaService.getList();
	}
	
	@GetMapping("/option/{id}")
	public Option getOption(@PathVariable("id") String id) {
		return optionService.findById(id);
	}

	@PutMapping("/options")
	public void saveOptions(@Valid @RequestBody OptionsDTO options, @RequestHeader (name="Authorization") String authorization) {
		optionService.save(options, authenticateService.getCurrentUser(authorization));
	}
	
}
