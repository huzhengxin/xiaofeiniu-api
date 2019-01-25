SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;


/*管理员信息表*/
CREATE TABLE xfn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(32) UNIQUE,
    apwd VARCHAR(64)
);
INSERT INTO xfn_admin VALUES
(NULL,'admin',PASSWORD('123456')),
(NULL,'boss',PASSWORD('888888'));

/*全局设置*/
CREATE TABLE xfn_setting(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    appname VARCHAR(32),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(64),
);
INSERT INTO xfn_admin VALUES
(NULL,'小肥牛','http://127.0.0.1:8090','http://127.0.0.1:8091','http://127.0.0.1:8092','京ICP备12003709号-3','Copyright © 2002-2019 北京达内金桥科技有限公司版权所有');

/*桌台信息表:xfn_table*/
CREATE TABLE xfn_table(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tname VARCHAR(32),
    type  VARCHAR(16),
    states INT
);
INSERT INTO xfn_table VALUES
(null,'胡杨厅','6人桌','1'),
(null,'上海厅','8人桌','3'),
(null,'全家福厅','10人桌','2'),
(null,'北京厅','3人桌','0'),
(null,'小猪佩奇厅','5人桌','2'),
(null,'熊大厅','20人桌','2'),
/*桌台的预定信息 xfn_reservation*/




/*菜品类别表 xfn_category*/