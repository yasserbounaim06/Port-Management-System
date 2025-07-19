-- Migration: Create operation_shifts association table for many-to-many Operation <-> Shift
CREATE TABLE IF NOT EXISTS operation_shifts (
    operation_id INT NOT NULL,
    shift_id INT NOT NULL,
    PRIMARY KEY (operation_id, shift_id),
    FOREIGN KEY (operation_id) REFERENCES operation(id) ON DELETE CASCADE,
    FOREIGN KEY (shift_id) REFERENCES shift(id) ON DELETE CASCADE
);
