package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.Cat;
import br.pro.hashi.nfp.dao.DAO;

public class CatDAO extends DAO<Cat> {
	public CatDAO() {
		super("cats");
	}
}
