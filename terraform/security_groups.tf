# # module "vote_service_sg" {
# #   source = "terraform-aws-modules/security-group/aws"

# #   name        = "user-service"
# #   description = "Security group for user-service with custom ports open within VPC, and PostgreSQL publicly open"
# #   vpc_id      = "vpc-0c5a4b866f7244d31"

# #   ingress_cidr_blocks = ["10.10.0.0/16"]
# #   ingress_rules       = ["https-443-tcp"]
# #   ingress_with_cidr_blocks = [
# #     {
# #       from_port   = 443
# #       to_port     = 443
# #       protocol    = "tcp"
# #       description = "HTTPS Access to VPC"
# #       cidr_blocks = "50.226.205.89/29"
# #     },
# #     {
# #       rule        = "postgresql-tcp"
# #       cidr_blocks = "50.226.205.89"
# #     },
# #   ]
# # }

# #--------------------------------------------------------------
# # VPC 
# #--------------------------------------------------------------

# resource "aws_security_group" "staging_vpc_sg" {
#   name        = "${var.application_name} ${var.environment} VPC security group"
#   description = "Allow SSH and HTTPS Access to VPC"
#   vpc_id      = var.vpc_id

#   #   tags = merge(
#   #     local.common_tags,
#   #     {
#   #       Name = "${var.application_name} Private security group"
#   #     }
#   #   )

#   ingress {
#     from_port   = "443"
#     to_port     = "443"
#     protocol    = "tcp"
#     cidr_blocks = split(",", var.direct_connect_cidr_blocks)
#     description = "Direct Connect IPs"
#   }

#   #SSH

#   ingress {
#     from_port   = "22"
#     to_port     = "22"
#     protocol    = "tcp"
#     cidr_blocks = split(",", var.direct_connect_cidr_blocks)
#     description = "Direct Connect IPs"
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_security_group" "staging_eks_sg" {
#   name        = "${var.application_name} ${var.environment} EKS security group"
#   description = "EKS security group"
#   vpc_id      = var.vpc_id

#   #   tags = merge(
#   #     local.common_tags,
#   #     {
#   #       Name = "${var.application_name} ALB security group"
#   #     }
#   #   )

#   ingress {
#     from_port   = "22"
#     to_port     = "22"
#     protocol    = "tcp"
#     cidr_blocks = split(",", var.direct_connect_cidr_blocks)
#     description = "Direct Connect IPs"
#   }

#   ingress {
#     from_port   = "443"
#     to_port     = "443"
#     protocol    = "tcp"
#     cidr_blocks = split(",", var.direct_connect_cidr_blocks)
#     description = "Direct Connect IPs"
#   }

#   #   ingress {
#   #     from_port   = "443"
#   #     to_port     = "443"
#   #     protocol    = "tcp"
#   #     cidr_blocks = split(",", var.private_subnet_cidr_blocks)
#   #     description = "VPC CIDR"
#   #   }

#   ingress {
#     from_port   = "3306"
#     to_port     = "3306"
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "RDS connection"
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }



# # resource "aws_security_group" "staging_rds_sg" {
# #   name        = "${var.application_name} ${var.environment} VPC security group"
# #   description = "Allow SSH and HTTPS Access to VPC"
# #   vpc_id      = var.vpc_id

# #   #   tags = merge(
# #   #     local.common_tags,
# #   #     {
# #   #       Name = "${var.application_name} Private security group"
# #   #     }
# #   #   )

# #   ingress {
# #     from_port   = "443"
# #     to_port     = "443"
# #     protocol    = "tcp"
# #     cidr_blocks = split(",", var.direct_connect_cidr_blocks)
# #     description = "Direct Connect IPs"
# #   }

# #   #SSH

# #   ingress {
# #     from_port   = "22"
# #     to_port     = "22"
# #     protocol    = "tcp"
# #     cidr_blocks = split(",", var.direct_connect_cidr_blocks)
# #     description = "Direct Connect IPs"
# #   }

# #   egress {
# #     from_port   = 0
# #     to_port     = 0
# #     protocol    = "-1"
# #     cidr_blocks = ["0.0.0.0/0"]
# #   }
# # }