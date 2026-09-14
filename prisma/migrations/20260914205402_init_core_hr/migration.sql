-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Department_name_key`(`name`),
    UNIQUE INDEX `Department_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Designation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Designation_name_key`(`name`),
    UNIQUE INDEX `Designation_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `startTime` VARCHAR(5) NOT NULL,
    `endTime` VARCHAR(5) NOT NULL,
    `graceMinutes` INTEGER NOT NULL DEFAULT 10,
    `breakAllowed` BOOLEAN NOT NULL DEFAULT true,
    `breakStartTime` VARCHAR(5) NULL,
    `breakEndTime` VARCHAR(5) NULL,
    `breakGraceMinutes` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Shift_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftWeeklyOff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shiftId` INTEGER NOT NULL,
    `dayOfWeek` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ShiftWeeklyOff_shiftId_idx`(`shiftId`),
    UNIQUE INDEX `ShiftWeeklyOff_shiftId_dayOfWeek_key`(`shiftId`, `dayOfWeek`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeCode` VARCHAR(30) NOT NULL,
    `employeeName` VARCHAR(150) NOT NULL,
    `officialEnglishName` VARCHAR(150) NULL,
    `fatherName` VARCHAR(150) NULL,
    `cnic` VARCHAR(30) NULL,
    `dateOfBirth` DATE NULL,
    `personalPhone` VARCHAR(30) NULL,
    `email` VARCHAR(150) NULL,
    `address` TEXT NULL,
    `emergencyContact` VARCHAR(100) NULL,
    `profilePhotoUrl` VARCHAR(500) NULL,
    `joiningDate` DATE NOT NULL,
    `systemEnrollmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employmentStatus` ENUM('PROBATION', 'CONFIRMED', 'ACTIVE', 'NOTICE_PERIOD', 'EXITED', 'TERMINATED') NOT NULL DEFAULT 'PROBATION',
    `probationMonths` INTEGER NOT NULL DEFAULT 2,
    `probationEndDate` DATE NULL,
    `salaryType` ENUM('BASIC_SALARY', 'NO_BASIC_SALARY') NOT NULL DEFAULT 'BASIC_SALARY',
    `currentBasicSalary` DECIMAL(12, 2) NULL,
    `salaryEffectiveDate` DATE NULL,
    `savingsEnabled` BOOLEAN NOT NULL DEFAULT true,
    `punctualityDeductionEnabled` BOOLEAN NOT NULL DEFAULT true,
    `leaveDeductionEnabled` BOOLEAN NOT NULL DEFAULT true,
    `halfDayDeductionEnabled` BOOLEAN NOT NULL DEFAULT true,
    `absenceDeductionEnabled` BOOLEAN NOT NULL DEFAULT true,
    `dockFineEnabled` BOOLEAN NOT NULL DEFAULT true,
    `otherFineEnabled` BOOLEAN NOT NULL DEFAULT true,
    `departmentId` INTEGER NULL,
    `designationId` INTEGER NULL,
    `shiftId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employee_employeeCode_key`(`employeeCode`),
    UNIQUE INDEX `Employee_cnic_key`(`cnic`),
    INDEX `Employee_departmentId_idx`(`departmentId`),
    INDEX `Employee_designationId_idx`(`designationId`),
    INDEX `Employee_shiftId_idx`(`shiftId`),
    INDEX `Employee_employmentStatus_idx`(`employmentStatus`),
    INDEX `Employee_joiningDate_idx`(`joiningDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalaryHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `previousSalary` DECIMAL(12, 2) NULL,
    `newSalary` DECIMAL(12, 2) NULL,
    `effectiveDate` DATE NOT NULL,
    `reason` VARCHAR(255) NULL,
    `remarks` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `SalaryHistory_employeeId_idx`(`employeeId`),
    INDEX `SalaryHistory_effectiveDate_idx`(`effectiveDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShiftWeeklyOff` ADD CONSTRAINT `ShiftWeeklyOff_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_designationId_fkey` FOREIGN KEY (`designationId`) REFERENCES `Designation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalaryHistory` ADD CONSTRAINT `SalaryHistory_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
