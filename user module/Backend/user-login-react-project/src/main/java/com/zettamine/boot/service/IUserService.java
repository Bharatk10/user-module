package com.zettamine.boot.service;

import java.util.List;
import java.util.Map;

import com.zettamine.boot.dto.LoginDto;
import com.zettamine.boot.dto.UserDto;
import com.zettamine.boot.dto.UserRoleDto;

public interface IUserService {

	Boolean save(UserDto userDto);
	
	Boolean checkValidUser(String email);
	
	public Map<String, Object> checkValidPassword(LoginDto dto);
	
	Boolean updatePassword(LoginDto dto);

	Boolean forgotPassword(String email);
	
	public List<UserRoleDto> getAllUsers();
	
	public Boolean deleteUserById(Integer Id);

	UserRoleDto getUserById(Integer id);
	
	public Boolean update(UserDto userDto);

	UserRoleDto getEmployeeByEmail(String email);
}
