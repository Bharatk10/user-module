package com.zettamine.boot.dto;

import com.fasterxml.jackson.annotation.JsonSetter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDto {
	
	private Integer userId;
	private String firstName;
	private String lastName;
	private String email;
	private String designation;
	private Integer roleId;
	private byte[] image;
	
	
	
}
