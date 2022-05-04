package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.Test;

class CatTest {
	@Test
	void build() {
		Cat cat = new Cat("Nino", "Sialata", Eye.BLUE, "http://www.nino.com/foto.png", LocalDate.of(2020, Month.OCTOBER, 5));

		assertNull(cat.getKey());

		assertEquals("Nino", cat.getName());
		assertEquals("Sialata", cat.getBreed());
		assertEquals(Eye.BLUE, cat.getEye());
		assertEquals("http://www.nino.com/foto.png", cat.getPhoto());

		LocalDate birth = LocalDate.ofEpochDay(cat.getBirth());
		assertEquals(2020, birth.getYear());
		assertEquals(Month.OCTOBER, birth.getMonth());
		assertEquals(5, birth.getDayOfMonth());
	}
}
