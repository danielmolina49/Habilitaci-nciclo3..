package com.unab.banca.Dao;
import com.unab.banca.Models.Transaccion;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransaccionDao  extends CrudRepository<Transaccion, String> {
    
}
