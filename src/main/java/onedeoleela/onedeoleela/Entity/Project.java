package onedeoleela.onedeoleela.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Column(length = 1000)
    private String description;

    @Column(name = "created_by")
    private String createdBy;

    @Lob
    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(name = "work_order_pdf", nullable = false)
    private byte[] workOrderPdf;
}
