-- Migration: Create operation_personnels association table
CREATE TABLE IF NOT EXISTS operation_personnels (
    operation_id INT NOT NULL,
    personnel_id INT NOT NULL,
    PRIMARY KEY (operation_id, personnel_id),
    FOREIGN KEY (operation_id) REFERENCES operation(id) ON DELETE CASCADE,
    FOREIGN KEY (personnel_id) REFERENCES personnel(id) ON DELETE CASCADE
);
