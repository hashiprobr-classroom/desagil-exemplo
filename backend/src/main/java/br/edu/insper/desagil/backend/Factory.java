// Não é necessário entender ou modificar este arquivo.

package br.edu.insper.desagil.backend;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import br.pro.hashi.nfp.dao.Firebase;
import br.pro.hashi.nfp.rest.server.RestServer;

public class Factory {
	private Properties properties;

	public Factory(String name) {
		this.properties = new Properties();
		try {
			this.properties.load(new FileInputStream("%s.properties".formatted(name)));
		} catch (IOException exception) {
			throw new RuntimeException(exception);
		}
	}

	private String getProperty(String key) {
		if (properties.containsKey(key)) {
			return properties.getProperty(key);
		} else {
			throw new RuntimeException("Property %s does not exist".formatted(key));
		}
	}

	public Firebase createFirebase() {
		String path = getProperty("dao.credentials");
		String url = getProperty("dao.storage.url");
		if (url.startsWith("gs://")) {
			url = url.substring(5);
		}
		String key = "dao.name";
		String name;
		if (properties.containsKey(key)) {
			name = properties.getProperty(key);
			if (name.isBlank()) {
				name = null;
			}
		} else {
			name = null;
			System.err.println("Property %s does not exist, defaulted to blank".formatted(key));
		}
		return Firebase.Manager().create(path, url, name);
	}

	public RestServer createRestServer() {
		String name = getProperty("rest.package");
		String key = "rest.port";
		int port;
		if (properties.containsKey(key)) {
			port = Integer.parseInt(properties.getProperty(key));
		} else {
			port = 8080;
			System.err.println("Property %s does not exist, defaulted to %d".formatted(key, port));
		}
		return RestServer.Builder(name).at(port).build();
	}

	public boolean useTunnel() {
		String key = "rest.tunnel";
		boolean value;
		if (properties.containsKey(key)) {
			value = Boolean.parseBoolean(properties.getProperty(key));
		} else {
			value = false;
			System.err.println("Property %s does not exist, defaulted to %d".formatted(key, value));
		}
		return value;
	}
}
