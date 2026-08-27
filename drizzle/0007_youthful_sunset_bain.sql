ALTER TABLE `consultation_requests` ADD `sourceProjectSlug` varchar(160);--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD `sourceProjectTitle` varchar(255);--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD `utmSource` varchar(100);--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD `utmMedium` varchar(100);--> statement-breakpoint
ALTER TABLE `consultation_requests` ADD `utmCampaign` varchar(160);