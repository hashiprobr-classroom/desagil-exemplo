// Não é necessário entender ou modificar este arquivo.

package br.edu.insper.desagil.backend;

import br.pro.hashi.nfp.dao.Firebase;
import br.pro.hashi.nfp.rest.server.RestServer;

public class Backend {
	public static void main(String[] args) {
		Factory factory = new Factory("main");

		Firebase firebase = factory.createFirebase();
		firebase.connect();

		RestServer server = factory.createRestServer();
		boolean useTunnel = factory.useTunnel();
		server.start(useTunnel);

		Runtime.getRuntime().addShutdownHook(new Thread(() -> {
			server.stop();
			server.destroy();
			firebase.disconnect();
			firebase.remove();
		}));
	}
}
