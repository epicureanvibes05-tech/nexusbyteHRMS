-- CreateTable
CREATE TABLE `Tenant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(100) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tenant_slug_key`(`slug`),
    INDEX `Tenant_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenantId` INTEGER NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `currentSettingsId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Company_tenantId_isActive_idx`(`tenantId`, `isActive`),
    UNIQUE INDEX `Company_tenantId_code_key`(`tenantId`, `code`),
    UNIQUE INDEX `Company_tenantId_id_key`(`tenantId`, `id`),
    UNIQUE INDEX `Company_tenantId_id_currentSettingsId_key`(`tenantId`, `id`, `currentSettingsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanySettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenantId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `version` INTEGER NOT NULL,
    `timezone` VARCHAR(100) NOT NULL,
    `currency` CHAR(3) NOT NULL,
    `validFrom` DATE NOT NULL,
    `validTo` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CompanySettings_tenantId_companyId_validFrom_idx`(`tenantId`, `companyId`, `validFrom`),
    UNIQUE INDEX `CompanySettings_tenantId_companyId_id_key`(`tenantId`, `companyId`, `id`),
    UNIQUE INDEX `CompanySettings_tenantId_companyId_version_key`(`tenantId`, `companyId`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_tenantId_id_currentSettingsId_fkey` FOREIGN KEY (`tenantId`, `id`, `currentSettingsId`) REFERENCES `CompanySettings`(`tenantId`, `companyId`, `id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `CompanySettings` ADD CONSTRAINT `CompanySettings_tenantId_companyId_fkey` FOREIGN KEY (`tenantId`, `companyId`) REFERENCES `Company`(`tenantId`, `id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
