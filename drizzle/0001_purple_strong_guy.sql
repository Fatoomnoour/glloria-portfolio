ALTER TABLE `projects` ADD `ownerId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `ownerId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `consentConfirmed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `verificationStatus` enum('pending','verified','rejected') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `testimonials_verification_idx` ON `testimonials` (`verificationStatus`);