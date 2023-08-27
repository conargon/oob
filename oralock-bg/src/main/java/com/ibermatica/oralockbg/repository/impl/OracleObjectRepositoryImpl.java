package com.ibermatica.oralockbg.repository.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.ibermatica.oralockbg.model.Lock;
import com.ibermatica.oralockbg.model.OracleObject;
import com.ibermatica.oralockbg.repository.OracleObjectRepositoryCustom;

public class OracleObjectRepositoryImpl implements OracleObjectRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;


	@Override
	public List<OracleObject> find(String owner, String type, String name, String user, String sort, String dir) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<OracleObject> query = cb.createQuery(OracleObject.class);
		Root<OracleObject> o = query.from(OracleObject.class);

		Path<String> ownerPath = o.get("owner");
		Path<String> typePath = o.get("type");
		Path<String> namePath = o.get("name");

		List<Predicate> predicates = new ArrayList<>();

		if (owner != null && !"".equals(owner)) {
			predicates.add(cb.equal(ownerPath, owner));
		}

		if (type != null && !"".equals(type)) {
			predicates.add(cb.equal(typePath, type));
		}

		if (name != null && !"".equals(name)) {
			predicates.add(cb.like(namePath, '%' + name.toUpperCase() + "%"));
		}

		if (user != null && !"".equals(user)) {
			Join<OracleObject, Lock> join = o.join("lock");
			Path<String> userPath = join.get("user");
			if ("**any**".equals(user)) {
				predicates.add(cb.isNotNull(userPath));
			} else {
				predicates.add(cb.equal(userPath, user));
			}
		}

		List<Order> orderList = new ArrayList<>();

		switch (sort) {
		case "object": {
			orderList.add("desc".equals(dir) ? cb.desc(namePath) : cb.asc(namePath));
			orderList.add(cb.asc(ownerPath));
			orderList.add(cb.asc(typePath));
			break;
		}
		case "date": {
			final Date MIN_DATE = new Date(0L);
			final Date MAX_DATE = new Date();
			Join<OracleObject, Lock> join = o.join("lock", JoinType.LEFT);
			Path<String> datePath = join.get("date");
			orderList.add("desc".equals(dir) ? cb.desc(cb.coalesce(datePath, MIN_DATE)) : cb.asc(cb.coalesce(datePath, MAX_DATE)));
			orderList.add(cb.asc(ownerPath));
			orderList.add(cb.asc(typePath));
			break;
		}
		case "user": {
			final String MIN_USER = "AAAAAAA";
			final String MAX_USER = "ZZZZZZZ";
			Join<OracleObject, Lock> join = o.join("lock", JoinType.LEFT);
			Path<String> userPath = join.get("username");
			orderList.add("desc".equals(dir) ? cb.desc(cb.coalesce(userPath, MIN_USER)) : cb.asc(cb.coalesce(userPath, MAX_USER)));
			orderList.add(cb.asc(ownerPath));
			orderList.add(cb.asc(typePath));
			break;
		}
		default: {
			orderList.add(cb.asc(ownerPath));
			orderList.add(cb.asc(typePath));
			orderList.add(cb.asc(namePath));
		}
		}

		query.select(o).where(cb.and(predicates.toArray(new Predicate[predicates.size()]))).orderBy(orderList);

		return entityManager.createQuery(query).getResultList();
	}


}
