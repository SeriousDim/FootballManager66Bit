package ru.seriousdim.football_manager.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = Footballer.TABLE_NAME)
public class Footballer {

    public static final String TABLE_NAME = "Footballer";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String surname;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Date birthDate;
    private String team;

    @Enumerated(EnumType.STRING)
    private Country country;

    public Footballer() {
    }

    public Footballer(Long id, String name, String surname, Sex sex, Date birthDate, String team, Country country) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.birthDate = birthDate;
        this.team = team;
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Footballer)) return false;
        Footballer that = (Footballer) o;
        return getId().equals(
                that.getId()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getSurname(), that.getSurname()) &&
                getSex() == that.getSex() &&
                getBirthDate().equals(that.getBirthDate()) &&
                Objects.equals(getTeam(), that.getTeam()) &&
                getCountry() == that.getCountry();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getSurname(), getSex(), getBirthDate(), getTeam(), getCountry());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
