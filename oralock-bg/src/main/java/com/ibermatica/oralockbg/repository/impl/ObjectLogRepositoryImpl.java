package com.ibermatica.oralockbg.repository.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.ibermatica.oralockbg.model.ObjectLog;
import com.ibermatica.oralockbg.model.Operation;
import com.ibermatica.oralockbg.repository.ObjectLogRepositoryCustom;

public class ObjectLogRepositoryImpl implements ObjectLogRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<ObjectLog> find(String owner, String type, String name, String sort, String dir) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<ObjectLog> query = cb.createQuery(ObjectLog.class);
		Root<ObjectLog> o = query.from(ObjectLog.class);

		Path<String> ownerPath = o.get("owner");
		Path<String> typePath = o.get("type");
		Path<String> namePath = o.get("name");
		Path<Date> datePath = o.get("date");

		List<Predicate> predicates = new ArrayList<>();

		if (owner != null && !"".equals(owner)) {
			predicates.add(cb.equal(ownerPath, owner));
		}

		if (type != null && !"".equals(type)) {
			predicates.add(cb.equal(typePath, type));
		}

		if (name != null && !"".equals(name)) {
			predicates.add(cb.equal(namePath, name));
		}

		List<Order> orderList = new ArrayList<>();

		switch (sort) {
		case "user": {
			Path<String> userPath = o.get("username");
			orderList.add("desc".equals(dir) ? cb.desc(userPath) : cb.asc(userPath));
			break;
		}
		case "op": {
			Join<ObjectLog, Operation> join = o.join("op");
			Path<String> opPath = join.get("id");
			orderList.add("desc".equals(dir) ? cb.desc(opPath) : cb.asc(opPath));
			break;
		}
		case "date": {
			orderList.add("desc".equals(dir) ? cb.desc(datePath) : cb.asc(datePath));
			break;
		}
		default: {
			orderList.add(cb.desc(datePath));	
		}
		}		

		query.select(o).where(cb.and(predicates.toArray(new Predicate[predicates.size()]))).orderBy(orderList);

		return entityManager.createQuery(query).getResultList();
	}
}
