ALTER TABLE `projects` ADD `challenge` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `concept` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `materials` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `palette` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `serviceScope` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `beforeImageUrl` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `beforeImageAlt` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `afterImageUrl` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `afterImageAlt` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `caseStudyApproved` boolean DEFAULT false NOT NULL;