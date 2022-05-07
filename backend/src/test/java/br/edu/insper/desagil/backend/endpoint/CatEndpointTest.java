package br.edu.insper.desagil.backend.endpoint;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import br.pro.hashi.nfp.rest.client.EndpointTest;

class CatEndpointTest extends EndpointTest {
	@BeforeEach
	void setUp() {
		start("http://192.168.15.27:8080");
	}

	@AfterEach
	void tearDown() {
		stop();
	}
}
