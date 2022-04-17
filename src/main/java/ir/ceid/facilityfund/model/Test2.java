package ir.ceid.facilityfund.model;


//import jdk.nashorn.internal.orgbjects.annotations.Getter;

import javax.persistence.*;
//
//@Getter @Setter

@Entity
@Table(name = "test")
public class Test2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "f_name")
    private String fName;

    @Column(name = "l_name")
    private String lName;

    public Test2() {

    }

    public Test2(String fName, String lName) {
        super();
        this.fName = fName;
        this.lName = lName;
    }

    public Long getId() {
        return id;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

}
