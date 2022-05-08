package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

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
		dao = new CatDAO();
		Selection selection = dao.select();
		dao.delete(selection);

		Cat cat = new Cat("Nino", "Sialata", Eye.BLUE, "http://www.nino.com/foto.png", LocalDate.of(2020, Month.OCTOBER, 5));
		dao.create(cat);
		key = cat.getKey();
	}

	@Test
	void retrieve() {
		Cat cat = dao.retrieve(key);
		assertNotNull(cat);

		assertEquals(key, cat.getKey());

		assertEquals("Nino", cat.getName());
		assertEquals("Sialata", cat.getBreed());
		assertEquals(Eye.BLUE, cat.getEye());
		assertEquals("http://www.nino.com/foto.png", cat.getPhoto());

		LocalDate birth = LocalDate.ofEpochDay(cat.getBirth());
		assertEquals(2020, birth.getYear());
		assertEquals(Month.OCTOBER, birth.getMonth());
		assertEquals(5, birth.getDayOfMonth());
	}

	@Test
	void update() {
		Cat cat;

		cat = new Cat("Pepe", "Laranja", Eye.GREEN, "http://www.pepe.com/foto.png", LocalDate.of(2021, Month.AUGUST, 4));
		cat.setKey(key);
		dao.update(cat);

		cat = dao.retrieve(key);

		assertEquals(key, cat.getKey());

		assertEquals("Pepe", cat.getName());
		assertEquals("Laranja", cat.getBreed());
		assertEquals(Eye.GREEN, cat.getEye());
		assertEquals("http://www.pepe.com/foto.png", cat.getPhoto());

		LocalDate birth = LocalDate.ofEpochDay(cat.getBirth());
		assertEquals(2021, birth.getYear());
		assertEquals(Month.AUGUST, birth.getMonth());
		assertEquals(4, birth.getDayOfMonth());
	}

	@Test
	void delete() {
		dao.delete(key);
		assertNull(dao.retrieve(key));
	}

	@AfterAll
	static void tearDownClass() {
		firebase.disconnect();
		firebase.remove();
	}

}
