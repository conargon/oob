-- create schema
alter session set "_oracle_script"=true;

create user oob identified by oob;

grant connect, resource to oob;
grant create session to oob;
grant create view to oob;
--grant select_catalog_role to oob;
grant select any dictionary to oob;
grant administer database trigger to oob;
alter user oob quota unlimited on users;


-- Roles table
create table oob.oobl_role (
    or_id  varchar2(30) not null,
    or_label  varchar2(30) not null,
    or_admin char(1) not null
);

comment on table oob.oobl_role is 'Roles table';
comment on column oob.oobl_role.or_id is 'Role Id';
comment on column oob.oobl_role.or_label is 'Role name';
comment on column oob.oobl_role.or_admin is 'Flag admin role';

create unique index oob.oobl_role_pk on oob.oobl_role(or_id);
alter table oob.oobl_role add constraint oobl_role_pk primary key(or_id);
alter table oob.oobl_role add constraint oobl_role_ck01 check (or_admin in ('1','0'));


insert into oob.oobl_role(or_id, or_label, or_admin) values ('ADMIN', 'role.admin', '1');
insert into oob.oobl_role(or_id, or_label, or_admin) values ('USER', 'role.user', '0');
commit;

alter table oob.oobl_role read only;

-- Users table
create table oob.oobl_user (
    ou_id varchar2(30) not null,
    ou_name varchar2(250) not null,
    ou_email varchar2(250) not null,
    ou_role varchar2(30) not null,
    ou_lang varchar2(2) default 'es' not null,
    ou_enabled date default sysdate not null,
    ou_disabled date
);

comment on table oob.oobl_user is 'Users table';
comment on column oob.oobl_user.ou_id is 'User Id';
comment on column oob.oobl_user.ou_name is 'User name';
comment on column oob.oobl_user.ou_email is 'User email';
comment on column oob.oobl_user.ou_role is 'User role';
comment on column oob.oobl_user.ou_lang is 'User language';
comment on column oob.oobl_user.ou_enabled is 'Registration date';
comment on column oob.oobl_user.ou_disabled is 'Disabling date';

create unique index oob.oobl_user_pk on oob.oobl_user(ou_id);
alter table oob.oobl_user add constraint oobl_user_pk primary key(ou_id);
create index oob.oobl_user_fk01 on oob.oobl_user(ou_role);
alter table oob.oobl_user add constraint oobl_user_fk01 foreign key (ou_role) references oob.oobl_role(or_id);

-- change insert data by your user db
insert into oob.oobl_user (ou_id, ou_name, ou_email, ou_role) values ('TINO', 'Tino', 'conargon@gmail.com', 'ADMIN');
commit;


-- Oracle object types table
create table oob.oobl_object (
    oo_id varchar2(30) not null,
    oo_class varchar2(1) not null,
    oo_label varchar2(30) not null,
    oo_active char(1) default '1' not null,    
    oo_icon varchar2(30) not null,
    oo_order number not null
);

comment on table oob.oobl_object is 'Oracle object types table';
comment on column oob.oobl_object.oo_id is 'Object type name';
comment on column oob.oobl_object.oo_class is 'Object type class: (S) SQL type like table or view; (P) PLSQL type like procedure or package';
comment on column oob.oobl_object.oo_label is 'Translation code';
comment on column oob.oobl_object.oo_active is 'Block active flag: (1) Can be blocked (0) Can not be blocked';
comment on column oob.oobl_object.oo_icon is 'Object icon name';
comment on column oob.oobl_object.oo_order is 'Object order list';

create unique index oob.oobl_object_pk on oob.oobl_object(oo_id);
alter table oob.oobl_object add constraint oobl_object_pk primary key(oo_id);
alter table oob.oobl_object add constraint oobl_object_ck01 check (oo_class in ('S','P'));
alter table oob.oobl_object add constraint oobl_object_ck02 check (oo_active in ('1','0'));

insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('TABLE', 'S', 'type.table', 'table.png', 1);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('VIEW', 'S', 'type.view', 'view.png', 2);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('MATERIALIZED VIEW', 'S', 'type.mview', 'mview.png', 3);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('INDEX', 'S', 'type.index', 'index.png', 4);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('TRIGGER', 'P', 'type.trigger', 'trigger.png', 5);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('PACKAGE', 'P', 'type.package', 'package.png', 6);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('PACKAGE BODY', 'P', 'type.package-body', 'package.png', 7);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('FUNCTION', 'P', 'type.function', 'function.png', 8);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('PROCEDURE', 'P', 'type.procedure', 'procedure.png', 9);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('SYNONYM', 'S', 'type.synonym', 'synonym.png', 10);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('JAVA SOURCE', 'P', 'type.java-source', 'java-source.png', 10);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('SEQUENCE', 'S', 'type.sequence', 'sequence.png', 11);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('TYPE', 'P', 'type.type', 'type.png', 13);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('TYPE BODY', 'P', 'type.type-body', 'type.png', 14);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('CLUSTER', 'S', 'type.cluster', 'cluster.png', 15);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('DATABASE LINK', 'S', 'type.dblink', 'dblink.png', 16);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('JOB', 'S', 'type.job', 'job.png', 17);
insert into oob.oobl_object(oo_id, oo_class, oo_label,oo_icon, oo_order) values ('QUEUE', 'S', 'type.queue', 'queue.png', 18);
commit;

-- Locks table
create table oob.oobl_block (
    ob_id number not null,
    ob_type varchar2(30) not null,
    ob_owner varchar2(30) not null,
    ob_name varchar2(30) not null,
    ob_user varchar2(30) not null, 
    ob_ref varchar2(30),
    ob_comment varchar2(4000) not null,
    ob_date date not null
);

comment on table oob.oobl_block is 'Locks table';
comment on column oob.oobl_block.ob_id is 'Lock Id';
comment on column oob.oobl_block.ob_type is 'Object type';
comment on column oob.oobl_block.ob_owner is 'Object owner';
comment on column oob.oobl_block.ob_name is 'Object name';
comment on column oob.oobl_block.ob_user is 'Blocker user';
comment on column oob.oobl_block.ob_ref is 'Issue ref';
comment on column oob.oobl_block.ob_comment is 'Comment about the lock';
comment on column oob.oobl_block.ob_date is 'Lock date';

create unique index oob.oobl_block_pk on oob.oobl_block(ob_id);
alter table oob.oobl_block add constraint oobl_block_pk primary key(ob_id);

create index oob.oobl_block_fk01 on oob.oobl_block(ob_type);
alter table oob.oobl_block add constraint oobl_block_fk01 foreign key (ob_type) references oob.oobl_object(oo_id);

create index oob.oobl_block_fk02 on oob.oobl_block(ob_user);
alter table oob.oobl_block add constraint oobl_block_fk02 foreign key (ob_user) references oob.oobl_user(ou_id) on delete cascade;

create unique index oob.oobl_block_uk on oob.oobl_block(ob_type, ob_owner, ob_name);
alter table oob.oobl_block add constraint oobl_block_uk unique (ob_type, ob_owner, ob_name);



create sequence oob.oobl_block_seq increment by 1 start with 1;

-- Operations table
create table oob.oobl_op (
    op_id varchar2(20) not null,
    op_name varchar2(30) not null
); 

comment on table oob.oobl_op is 'Operations table';
comment on column oob.oobl_op.op_id is 'Op Id';
comment on column oob.oobl_op.op_name is 'Translation code';

create unique index oob.oobl_op_pk on oob.oobl_op(op_id);
alter table oob.oobl_op add constraint oobl_op_pk primary key(op_id);

insert into oob.oobl_op(op_id, op_name) values ('LOCK','op.lock'); 
insert into oob.oobl_op(op_id, op_name) values ('UNLOCK','op.unlock'); 
insert into oob.oobl_op(op_id, op_name) values ('COMPILE','op.compile'); 
insert into oob.oobl_op(op_id, op_name) values ('COMPILE-ERROR','op.compile-error'); 
commit;

alter table oob.oobl_op read only;
	
-- Log operations table
create table oob.oobl_log (
    ol_id number not null,
    ol_type varchar2(30) not null,
    ol_owner varchar2(30) not null,
    ol_name varchar2(30) not null,
    ol_op varchar2(20) not null, 
    ol_user varchar2(30) not null, 
    ol_ref varchar2(30),
    ol_date date not null,
    ol_comment varchar2(4000)
);    

comment on table oob.oobl_log is 'Log operations table';
comment on column oob.oobl_log.ol_id is 'Log Id';
comment on column oob.oobl_log.ol_type is 'Object type';
comment on column oob.oobl_log.ol_owner is 'Object owner';
comment on column oob.oobl_log.ol_name is 'Object name';
comment on column oob.oobl_log.ol_user is 'Log user';
comment on column oob.oobl_log.ol_ref is 'Issue ref';
comment on column oob.oobl_log.ol_op is 'Operation log';
comment on column oob.oobl_log.ol_date is 'Date log';
comment on column oob.oobl_log.ol_comment is 'Comment log';

create unique index oob.oobl_log_pk on oob.oobl_log(ol_id);
alter table oob.oobl_log add constraint oobl_log_pk primary key(ol_id);

create index oob.oobl_log_fk01 on oob.oobl_log(ol_type);
alter table oob.oobl_log add constraint oobl_log_fk01 foreign key (ol_type) references oob.oobl_object(oo_id);

create index oob.oobl_log_fk02 on oob.oobl_log(ol_op);
alter table oob.oobl_log add constraint oobl_log_fk02 foreign key (ol_op) references oob.oobl_op(op_id);

create index oob.oobl_log_fk03 on oob.oobl_log(ol_user);

create sequence oob.oobl_log_seq increment by 1 start with 1;

-- schemas managed by oobl
create table oob.oobl_schema (
    os_schema varchar2(30) not null
);

comment on table oob.oobl_schema is 'Schemas managed by oobl table';
comment on column oob.oobl_schema.os_schema is 'Schema id/username';

create unique index oob.oobl_schema_pk on oob.oobl_schema(os_schema);
alter table oob.oobl_schema add constraint oobl_schema_pk primary key(os_schema);

insert into oob.oobl_schema select username from all_users;
commit;

-- Options table
create table oob.oobl_option (
    op_id varchar2(20) not null,
    op_value varchar2(100) not null
);

comment on table oob.oobl_option is 'Options table';
comment on column oob.oobl_option.op_id is 'Option id';
comment on column oob.oobl_option.op_value is 'Option value';

create unique index oob.oobl_option_pk on oob.oobl_option(op_id);
alter table oob.oobl_option add constraint oobl_option_pk primary key(op_id);

insert into oob.oobl_option(op_id, op_value) values ('default.lang','es');
commit;

-- Translations table
create table oob.oobl_translation (
    ot_id varchar2(30) not null,
    ot_lang varchar2(2) not null,
    ot_text varchar2(4000) not null,    
    ot_text_p varchar2(4000)
);

comment on table oob.oobl_translation is 'Translations table';
comment on column oob.oobl_translation.ot_id is 'Translation code';
comment on column oob.oobl_translation.ot_lang is 'Language code';
comment on column oob.oobl_translation.ot_text is 'Translated text';
comment on column oob.oobl_translation.ot_text_p is 'Plural translated text';

create unique index oob.oobl_translation_pk on oob.oobl_translation(ot_id, ot_lang);
alter table oob.oobl_translation add constraint oobl_translation_pk primary key(ot_id, ot_lang);
create index oob.oobl_translation_idx on oob.oobl_translation(ot_id);

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.table','es','Tabla','Tablas');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.table','va','Taula','Taules');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.table','en','Table','Tables');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.view','es','Vista','Vistas');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.view','va','Vista','Vistes');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.view','en','View','Views');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.mview','es','Vista materializada','Vistas materializadas');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.mview','va','Vista materialitzada','Vistes materialitzades');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.mview','en','Materialized view','Materialized views');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.index','es','�ndice','�ndices');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.index','va','�ndex','�ndexs');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.index','en','Index','Indexes');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.trigger','es','Disparador','Disparadores');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.trigger','va','Disparador','Disparadors');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.trigger','en','Trigger','Triggers');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.package','es','Paquete','Paquetes');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.package','va','Paquet','Paquets');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.package','en','Package','Packages');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.package-body','es','Paquete (cuerpo)','Paquetes (cuerpo)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.package-body','va','Paquet (cos)','Paquets (cos)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.package-body','en','Package body','Packages body');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.function','es','Funci�n','Funciones');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.function','va','Funci�','Funcions');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.function','en','Function','Functions');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.procedure','es','Procedimiento','Procedimientos');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.procedure','va','Procediment','Procediments');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.procedure','en','Procedure','Procedures');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.synonym','es','Sin�nimo','Sin�nimos');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.synonym','va','Sin�nim','Sin�nims');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.synonym','en','Synonym','Synonyms');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.java-source','es','Clase Java','Clases Java');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.java-source','va','Classe Java','Classes Java');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.java-source','en',' Java class','Java classes');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.sequence','es','Secuencia','Secuencias');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.sequence','va','Seq��ncia','Seq��ncies');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.sequence','en','Sequence','Sequences');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.type','es','Tipo','Tipos');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.type','va','Tipus','Tipus');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.type','en','Type','Types');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.type-body','es','Tipo (cuerpo)','Tipos (cuerpo)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.type-body','va','Tipus (cos)','Tipus (cos)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.type-body','en','Type body','Types body');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.cluster','es','Grupo (cluster)','Grupos (clusters)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.cluster','va','Grup (cluster)','Grups (clusters)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.cluster','en','Cluster','Clusters');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.dblink','es','Enlace a base de datos','Enlaces a base de datos');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.dblink','va','Enlla� a base de dades','Enlla�os a base de dades');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.dblink','en','Database link','Database links');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.job','es','Tarea (job)','Tareas (jobs)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.job','va','Tasca (job)','Tasques (jobs)');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.job','en','Job','Jobs');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.queue','es','Cola','Colas');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.queue','va','Cua','Cues');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text, ot_text_p) values ('type.queue','en','Queue','Queues');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.lock','es','Bloqueo de objeto');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.lock','va','Bloqueig d''objecte');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.lock','en','Object lock');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.unlock','es','Desbloqueo de objeto');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.unlock','va','Desbloqueig d''objecte');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.unlock','en','Object unlock');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.compile','es','Compilaci�n de objeto');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.compile','va','Compilaci� d''objecte');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.compile','en','Object compilation');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.compile-error','es','Compilaci�n no permitida de objeto');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.compile-error','va','Compilaci� no permesa d''objecte');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('op.compile-error','en','Object compilation denied');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('role.admin', 'es', 'Administrador');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('role.admin', 'va', 'Administrador');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('role.admin', 'en', 'Admin');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('role.user', 'es', 'Usuario');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('role.user', 'va', 'Usuari');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('role.user', 'en', 'User');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20010', 'es', 'No se permite cambiar ning�n dato del bloqueo');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20010', 'va', 'No es permet canviar cap dada del bloqueig');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20010', 'en', 'It is not allowed to change any data of the lock');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20014', 'es', 'El usuario no est� autorizado para bloquear el objeto');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20014', 'va', 'L''usuari no est� autoritzat per a bloquejar l''objecte');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20014', 'en', 'The user is not authorized to lock the object');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20015', 'es', 'El objeto a bloquear pertenece a un esquema no registrado');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20015', 'va', 'L''objecte a bloquejar pertany a un esquema no registrat');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20015', 'en', 'The object to be locked belongs to an unregistered schema');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20016', 'es', 'El tipo del objeto a bloquear no es valido');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20016', 'va', 'El tipus de l''objecte a bloquejar no �s valgut');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20016', 'en', 'The type of the object to lock is not valid');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20017', 'es', 'El objeto ya est� bloqueado');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20017', 'va', 'L''objecte ja est� bloquejat');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20017', 'en', 'The object is already locked');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20020', 'es', 'No se permite modificar el disparador {0}');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20020', 'va', 'No es permet modificar el disparador {0}');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20020', 'en', 'Not allowed to modify the trigger {0}');

insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20021', 'es', 'El objeto {0} est� bloqueado por el usuario {1}');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20021', 'va', 'L''objecte {0} est� bloquejat per l''usuari {1}');
insert into oob.oobl_translation(ot_id, ot_lang, ot_text) values ('error.20021', 'en', 'Object {0} is locked by user {1}');

commit;

create or replace function oob.get_traslated_msg(p_code_msg in varchar2, p_arg_0 in varchar2 default null, p_arg_1 in varchar2 default null) return varchar2
is
   v_result oob.oobl_translation.ot_text%type;
begin 
    select ot_text
    into v_result
    from oobl_translation
    join oobl_option on op_value=ot_lang and op_id='default.lang'
    where ot_id=p_code_msg;
    --
    if p_arg_0 is not null then
        v_result := replace(v_result, '{0}', p_arg_0);
    end if;
    --
    if p_arg_1 is not null then
        v_result := replace(v_result, '{1}', p_arg_1);
    end if;
    return v_result;
exception
    when no_data_found then
         return '???';
end get_traslated_msg;
/

create or replace procedure oob.save_ce_log(p_type_obj in varchar2, p_owner_obj in varchar2, p_name_obj in varchar2, p_user in varchar2, p_event in varchar2)
is
pragma autonomous_transaction;
begin
    insert into oobl_log (ol_id, ol_type, ol_owner, ol_name, ol_op, ol_user, ol_date, ol_comment)
    values (oobl_log_seq.nextval, p_type_obj, p_owner_obj, p_name_obj, 'COMPILE-ERROR', p_user, sysdate, 'Op: ' || p_event);     
    commit;
end;
/

create or replace trigger oob.oobl_block_ciu
for insert or update
on oob.oobl_block 
referencing new as new old as old
compound trigger
  dummy integer;
  
  before statement is
  begin          
    null;           
  end before statement;  

  before each row is
  begin                                 
                                       
    if inserting then     
        
        -- default values
        if :new.ob_id is null then
           :new.ob_id := oobl_block_seq.nextval;         
        end if;       
        
        if :new.ob_date is null then
           :new.ob_date := sysdate;
        end if;        
        
        -- The user is authorized to lock the object?
        begin
            select 1
            into dummy
            from oobl_user
            join all_users on username = ou_id
            where ou_id = :new.ob_user
              and ou_disabled is null;        
        exception
            when no_data_found then
                -- The user is not authorized to lock the object
                raise_application_error(-20014, get_traslated_msg('error.20014'));                 
        end;
        
        -- The object to be locked belongs to a registered schema?      
        begin
            select 1
            into dummy
            from oobl_schema
            where os_schema = :new.ob_owner;        
        exception
            when no_data_found then
                -- The object to be locked belongs to an unregistered schema
                raise_application_error(-20015, get_traslated_msg('error.20015')); 
        end;        
        
        -- The type of the object to lock is valid?
        begin
            select 1
            into dummy
            from oobl_object
            where oo_id = :new.ob_type 
              and oo_active = 1;        
        exception
            when no_data_found then
                -- The type of the object to lock is not valid
                raise_application_error(-20016, get_traslated_msg('error.20016')); 
        end;
        
        -- The object is already locked?      
        begin
            select ob_id
            into dummy
            from oobl_block
            where ob_owner = :new.ob_owner 
              and ob_type = :new.ob_type
              and ob_name = :new.ob_name;
            raise too_many_rows;
        exception
            when too_many_rows then
                -- The object is already locked
                raise_application_error(-20017, get_traslated_msg('error.20017'));
            when no_data_found then
                null;
        end;        
        
        
    elsif updating then                           
         -- It is not allowed to change any data of the lock                                   
         raise_application_error(-20010, get_traslated_msg('error.20010'));        
             
    end if;

  end before each row;

  after each row is
  begin    
    null;    
  end after each row;

  after statement is
  begin              
     null;     
  end after statement;         
  
end oobl_block_ciu;
/

create or replace trigger oob.oobl_db_log_trg
after ddl
on database
declare
   v_owner_obj varchar2(30);
   v_name_obj varchar2(30);
   v_type_obj varchar2(30);  
   dummy number;
begin

    v_owner_obj := ora_dict_obj_owner;
    v_name_obj := ora_dict_obj_name;
    v_type_obj := ora_dict_obj_type;
    
    -- el esquema est� registrado en oobl        
    begin
        select 1
        into dummy
        from oobl_schema
        where os_schema = v_owner_obj;        
    exception
        when no_data_found then
             return;
    end;       
       
    -- el tipo est� registrado y activo
    begin
        select 1
        into dummy
        from oobl_object
        where oo_id = v_type_obj
          and oo_active = 1;        
    exception
        when no_data_found then
             return;
    end;       
    
    insert into oobl_log (ol_id, ol_type, ol_owner, ol_name, ol_op, ol_user, ol_date, ol_comment)
    values (oobl_log_seq.nextval, v_type_obj, v_owner_obj, v_name_obj, 'COMPILE', sys_context('USERENV','CURRENT_USER'), sysdate, ora_sysevent);     

end oobl_db_log_trg; 
/


create or replace trigger oob.oobl_db_trg
before ddl
on database
declare
   v_owner_obj varchar2(30);
   v_name_obj varchar2(30);
   v_type_obj varchar2(30);  
   v_user varchar2(30);
   dummy number;
begin

    v_owner_obj := ora_dict_obj_owner;
    v_name_obj := ora_dict_obj_name;
    v_type_obj := ora_dict_obj_type;
    
    -- protect our own triggers
    if v_owner_obj = 'OOB' and v_type_obj = 'TRIGGER' 
        and v_name_obj in ('OOBL_BLOCK_CIU','OOBL_DB_LOG_TRG') 
    then
        -- Not allowed to modify the trigger
        raise_application_error(-20020, get_traslated_msg('error.20020', v_name_obj));
    end if;    
    
    -- the schema is registered?   
    begin
        select 1
        into dummy
        from oobl_schema
        where os_schema = v_owner_obj;        
    exception
        when no_data_found then
             return;
    end;      
       
    -- the type is registered and active?
    begin
        select 1
        into dummy
        from oobl_object
        where oo_id = v_type_obj
          and oo_active = 1;        
    exception
        when no_data_found then
            return;
    end;       
    
    -- check if the object is locked
    begin
        select ob_user
        into v_user
        from oobl_block
        where ob_owner = v_owner_obj
          and ob_type = v_type_obj
          and ob_name = v_name_obj;
        -- not allowed to alter a object locked by another user
        if v_user <> USER then
            save_ce_log(v_type_obj, v_owner_obj, v_name_obj, USER, ora_sysevent);
            raise_application_error(-20021, get_traslated_msg('error.20021', v_name_obj, v_user));
        end if;
    exception
        when no_data_found then
            return;
    end;      
    
end oobl_db_trg; 
/

