package ir.ceid.facilityfund.controller;

import ir.ceid.facilityfund.model.Test2;
import ir.ceid.facilityfund.repository.ITest2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test/")
public class Test2Controller {

    @Autowired
    private ITest2Repository iTest2Repository;

    //getAll Test2
    @GetMapping("/getAll")
    public List<Test2> getAllTest2() {
        return iTest2Repository.findAll();
    }
}
