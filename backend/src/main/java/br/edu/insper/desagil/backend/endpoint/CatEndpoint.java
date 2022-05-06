package br.edu.insper.desagil.backend.endpoint;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Cat;
import br.edu.insper.desagil.backend.dao.CatDAO;
import br.pro.hashi.nfp.dao.Selection;
import br.pro.hashi.nfp.rest.server.Args;
import br.pro.hashi.nfp.rest.server.Endpoint;

public class CatEndpoint extends Endpoint<Cat> {
	private CatDAO dao;

	public CatEndpoint() {
		super("/cat");
		dao = new CatDAO();
	}

	@Override
	public Cat get(Args args) {
		String key = args.get("key");
		return dao.retrieve(key);
	}

	@Override
	public List<Cat> getList(Args args) {
		Selection selection = dao.select();
		return dao.retrieve(selection);
	}

	@Override
	public Object post(Args args, Cat cat, Map<String, InputStream> streams) {
		return dao.create(cat, streams);
	}

	@Override
	public Object post(Args args, Cat cat) {
		return dao.create(cat);
	}

	@Override
	public Object put(Args args, Cat cat) {
		dao.update(cat);
		return null;
	}

	@Override
	public Object delete(Args args) {
		String key = args.get("key");
		dao.delete(key);
		return null;
	}

	@Override
	public Object deleteList(Args args) {
		Selection selection = dao.select();
		dao.delete(selection);
		return null;
	}
}
