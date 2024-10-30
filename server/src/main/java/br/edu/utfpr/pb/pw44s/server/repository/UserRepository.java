package br.edu.utfpr.pb.pw44s.server.repository;

import br.edu.utfpr.pb.pw44s.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // select * from tb_user where username=:username
    User findByUsername(String username);

    // select * from tb_user where displayName LIKE :displayName
    User findByDisplayNameContaining(String displayName);
}
