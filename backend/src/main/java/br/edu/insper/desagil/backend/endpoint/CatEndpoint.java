package br.edu.insper.desagil.backend.endpoint;

import java.io.InputStream;
import java.util.List;

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
	public String getFile(Args args) {
		String key = args.get("key");
		String name = args.get("name");
		return dao.retrieve(key, name);
	}

	@Override
	public Object post(Args args, Cat cat) {
		return dao.create(cat);
	}

	@Override
	public Object postFile(Args args, InputStream stream) {
		String key = args.get("key");
		String name = args.get("name");
		return dao.create(key, name, stream);
	}

	@Override
	public Object put(Args args, Cat cat) {
		dao.update(cat);
		return true;
	}

	@Override
	public Object putFile(Args args, InputStream stream) {
		String key = args.get("key");
		String name = args.get("name");
		return dao.update(key, name, stream);
	}

	@Override
	public Object delete(Args args) {
		String key = args.get("key");
		dao.delete(key);
		return true;
	}

	@Override
	public Object deleteList(Args args) {
		Selection selection = dao.select();
		dao.delete(selection);
		return true;
	}

	@Override
	public Object deleteFile(Args args) {
		String key = args.get("key");
		String name = args.get("name");
		dao.delete(key, name);
		return true;
	}
}
