package br.edu.insper.desagil.backend.core;

import java.time.LocalDate;

import br.pro.hashi.nfp.dao.Autokey;
import br.pro.hashi.nfp.dao.File;

public class Cat {
	@Autokey
	private String key;
	private String name;
	private String breed;
	private Eye eye;
	@File
	private String photo;
	private long birth;

	public Cat() {
	}

	public Cat(String name, String breed, Eye eye, String photo, LocalDate birth) {
		this.key = null;
		this.name = name;
		this.breed = breed;
		this.eye = eye;
		this.photo = photo;
		this.birth = birth.toEpochDay();
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public Eye getEye() {
		return eye;
	}

	public void setEye(Eye eye) {
		this.eye = eye;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public long getBirth() {
		return birth;
	}

	public void setBirth(long birth) {
		this.birth = birth;
	}
}
