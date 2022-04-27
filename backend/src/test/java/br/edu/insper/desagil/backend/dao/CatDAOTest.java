package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Factory;
import br.edu.insper.desagil.backend.core.Cat;
import br.edu.insper.desagil.backend.core.Eye;
import br.pro.hashi.nfp.dao.Firebase;
import br.pro.hashi.nfp.dao.Selection;

class CatDAOTest {
	private static Firebase firebase;

	private CatDAO dao;
	private String key;

	@BeforeAll
	static void setUpClass() {
		Factory factory = new Factory("test");
		firebase = factory.createFirebase();
		firebase.connect();
	}

	@BeforeEach
	void setUp() {
		dao = new CatDAO().using("test");
		Selection selection = dao.select();
		dao.delete(selection);

		Cat cat = new Cat("Nino", "Sialata", Eye.BLUE, LocalDate.of(2020, Month.OCTOBER, 5));
		key = dao.create(cat);
	}

	@Test
	void retrieve() {
		assertTrue(dao.exists(key));
		Cat cat = dao.retrieve(key);

		assertEquals(key, cat.getKey());

		assertEquals("Nino", cat.getName());
		assertEquals("Sialata", cat.getBreed());
		assertEquals(Eye.BLUE, cat.getEye());

		LocalDate birth = LocalDate.ofEpochDay(cat.getBirth());
		assertEquals(2020, birth.getYear());
		assertEquals(Month.OCTOBER, birth.getMonth());
		assertEquals(5, birth.getDayOfMonth());
	}

	@Test
	void update() {
		Cat cat;

		cat = new Cat("Pepe", "Laranja", Eye.GREEN, LocalDate.of(2021, Month.AUGUST, 4));
		cat.setKey(key);
		dao.update(cat);

		cat = dao.retrieve(key);

		assertEquals(key, cat.getKey());

		assertEquals("Pepe", cat.getName());
		assertEquals("Laranja", cat.getBreed());
		assertEquals(Eye.GREEN, cat.getEye());

		LocalDate birth = LocalDate.ofEpochDay(cat.getBirth());
		assertEquals(2021, birth.getYear());
		assertEquals(Month.AUGUST, birth.getMonth());
		assertEquals(4, birth.getDayOfMonth());
	}

	@Test
	void delete() {
		dao.delete(key);
		assertFalse(dao.exists(key));
	}

	@AfterAll
	static void tearDownClass() {
		firebase.disconnect();
		firebase.remove();
	}

}
