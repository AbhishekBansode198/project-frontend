package onedeoleela.onedeoleela.Controller;


import onedeoleela.onedeoleela.Entity.Project;


import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import onedeoleela.onedeoleela.Service.ProjectService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }



    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public Project createProject(
            @RequestParam String projectName,
            @RequestParam String description,
            @RequestParam String createdBy,
            @RequestParam MultipartFile workOrder
    ) throws Exception {

        System.out.println("🔥 CONTROLLER HIT");
        System.out.println("PDF bytes = " + workOrder.getBytes().length);

        Project project = Project.builder()
                .projectName(projectName)
                .description(description)
                .createdBy(createdBy)
                .workOrderPdf(workOrder.getBytes())
                .build();

        return projectService.save(project);
    }
    @GetMapping("/{id}/work-order")
    public ResponseEntity<byte[]> downloadWorkOrder(@PathVariable Long id) {

        Project project = projectService.getById(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"work-order-" + id + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(project.getWorkOrderPdf());
    }


}
