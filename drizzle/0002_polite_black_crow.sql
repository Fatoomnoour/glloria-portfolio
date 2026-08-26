CREATE TABLE `consultation_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int,
	`fullName` varchar(160) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`email` varchar(320),
	`city` varchar(160) NOT NULL,
	`propertyType` varchar(160) NOT NULL,
	`area` varchar(80) NOT NULL,
	`service` varchar(180) NOT NULL,
	`budget` varchar(160) NOT NULL,
	`preferredDate` varchar(10) NOT NULL,
	`preferredTime` varchar(10) NOT NULL,
	`description` text NOT NULL,
	`privacyConsent` boolean NOT NULL DEFAULT false,
	`honeypot` varchar(120),
	`status` enum('new','reviewing','contacted','confirmed','completed','cancelled') NOT NULL DEFAULT 'new',
	`adminNotes` text,
	`lastEditedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultation_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD CONSTRAINT `consultation_requests_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD CONSTRAINT `consultation_requests_lastEditedBy_users_id_fk` FOREIGN KEY (`lastEditedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `consultation_requests_status_idx` ON `consultation_requests` (`status`);--> statement-breakpoint
CREATE INDEX `consultation_requests_created_at_idx` ON `consultation_requests` (`createdAt`);--> statement-breakpoint
CREATE INDEX `consultation_requests_city_idx` ON `consultation_requests` (`city`);--> statement-breakpoint
CREATE INDEX `consultation_requests_service_idx` ON `consultation_requests` (`service`);