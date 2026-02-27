package onedeoleela.onedeoleela.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "users",
        uniqueConstraints = @UniqueConstraint(columnNames = "e_code")
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // AUTO GENaERATED
    @JsonProperty("eCode")
    @Column(name = "e_code", nullable = false, unique = true)
    private Long eCode;   // MANUAL, company-wide unique

    private String fullName;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
