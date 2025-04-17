# module "db" {
#   source = "terraform-aws-modules/rds/aws"

#   identifier = "stagingdb"

#   engine            = "mariadb"
#   engine_version    = "10.11"
#   instance_class    = "db.m5.large"
#   allocated_storage = 5

#   db_name  = "stagingdb"
#   username = "curexa"
#   port     = "3306"

#   iam_database_authentication_enabled = true

#   vpc_security_group_ids = ["sg-02ffa153f7f35cdbd"]

#   publicly_accessible = true

#   manage_master_user_password = true

#   maintenance_window = "Mon:00:00-Mon:03:00"
#   backup_window      = "03:00-06:00"

#   # Enhanced Monitoring - see example for details on how to create the role
#   # by yourself, in case you don't want to create it automatically
#   monitoring_interval    = "30"
#   monitoring_role_name   = "CurexaRDSMonitoringRole"
#   create_monitoring_role = true

#   tags = {
#     Owner       = "Curexa"
#     Environment = "staging"
#   }

#   # DB subnet group
#   create_db_subnet_group = true
#   subnet_ids             = ["subnet-072da4bb240614346", "subnet-083d81319ebe3de0e", "subnet-063941d3b1448a5a1", "subnet-02f7277f3353a5b16", "subnet-0f01a4930f9dcbbaa", "subnet-0d9efb7f1a143bdfd"]

#   # DB parameter group
#   family = "mariadb10.11"

#   # DB option group
#   major_engine_version = "10.11"

#   # Database Deletion Protection
#   deletion_protection = true

#   #   parameters = [
#   #     {
#   #       name  = "character_set_client"
#   #       value = "utf8mb4"
#   #     },
#   #     {
#   #       name  = "character_set_server"
#   #       value = "utf8mb4"
#   #     }
#   #   ]

#   #   options = [
#   #     {
#   #       option_name = "MARIADB_AUDIT_PLUGIN"

#   #       option_settings = [
#   #         {
#   #           name  = "SERVER_AUDIT_EVENTS"
#   #           value = "CONNECT"
#   #         },
#   #         {
#   #           name  = "SERVER_AUDIT_FILE_ROTATIONS"
#   #           value = "37"
#   #         },
#   #       ]
#   #     },
#   #   ]
# }