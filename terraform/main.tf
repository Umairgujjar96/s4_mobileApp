locals {
  aws_region = "us-east-1"
  vpc_name   = "scroll4-staging"
  tags = {
    environment          = "staging"
    organization         = "Scroll4"
    ops_managed_by       = "terraform",
    ops_source_repo      = "scroll4",
    ops_source_repo_path = "terraform",
    ops_owners           = "devops",
  }
}

terraform { 
  cloud { 
    
    organization = "Scroll4" 

    workspaces { 
      name = "scroll4-staging" 
    } 
  } 
}

# terraform {
#   required_providers {
#     aws = {
#       source  = "hashicorp/aws"
#       version = ">= 3.37.0"
#     }
#   }

#   backend "remote" {

#     organization = "Scroll4"

#     workspaces {
#       name = "scroll4-staging"
#     }
#   }
# }

provider "aws" {
  region = local.aws_region
}


module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = local.vpc_name
  # aws_region            = local.aws_region
  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  cidr            = "192.168.100.0/24"
  private_subnets = ["192.168.100.48/28", "192.168.100.64/28", "192.168.100.80/28"]
  public_subnets  = ["192.168.100.0/28", "192.168.100.16/28", "192.168.100.32/28"]
  enable_nat_gateway = true
#   vpn_gateway_id     = aws_vpn_gateway.staging_vpn_gateway.id
  # enable_vpn_gateway      = true
  map_public_ip_on_launch = true
  enable_flow_log         = true

  tags = local.tags
}

# resource "aws_default_route_table" "example" {
#   default_route_table_id = aws_vpc.example.default_route_table_id

#   route {
#     cidr_block = 
#     gateway_id = aws_internet_gateway.example.id
#   }

#   route {
#     ipv6_cidr_block        = "::/0"
#     egress_only_gateway_id = aws_egress_only_internet_gateway.example.id
#   }

#   tags = {
#     Name = "example"
#   }
# }

# resource "aws_vpn_gateway" "staging_vpn_gateway" {
#   vpc_id = var.vpc_id
#   tags = {
#     Name = "staging_vpn_gateway"
#   }
# }

# resource "aws_customer_gateway" "staging_customer_gateway" {
#   bgp_asn    = 65000
#   ip_address = "69.64.196.28"
#   type       = "ipsec.1"
#   tags = {
#     Name = "staging_customer_gateway"
#   }
# }

# resource "aws_vpn_connection" "cpm_staging_vpn_connection" {
#   vpn_gateway_id      = aws_vpn_gateway.staging_vpn_gateway.id
#   customer_gateway_id = aws_customer_gateway.staging_customer_gateway.id
#   type                = "ipsec.1"
#   # static_routes_only  = true
#   tunnel1_dpd_timeout_action      = "restart"
#   tunnel1_phase1_dh_group_numbers = toset([14, 16, 18, 19, 21])
#   tunnel1_phase2_dh_group_numbers = toset([18])

#   tunnel1_phase1_encryption_algorithms = toset(["AES256"])
#   tunnel1_phase2_encryption_algorithms = toset(["AES256"])

#   tunnel1_phase1_integrity_algorithms = toset(["SHA2-256"])
#   tunnel1_phase2_integrity_algorithms = toset(["SHA2-256"])
#   tunnel1_ike_versions                = toset(["ikev1"])

#   tunnel2_dpd_timeout_action      = "restart"
#   tunnel2_phase1_dh_group_numbers = toset([14, 16, 18, 19, 21])
#   tunnel2_phase2_dh_group_numbers = toset([18])

#   tunnel2_phase1_encryption_algorithms = toset(["AES256"])
#   tunnel2_phase2_encryption_algorithms = toset(["AES256"])

#   tunnel2_phase1_integrity_algorithms = toset(["SHA2-256"])
#   tunnel2_phase2_integrity_algorithms = toset(["SHA2-256"])
#   tunnel2_ike_versions                = toset(["ikev1"])

#   tags = {
#     Name = "cpm_staging_vpn_connection"
#   }
# }


# # Create a new load balancer
# resource "aws_elb" "cpm_elb" {
#   name               = "cpm-terraform-elb"
#   availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]

#   # access_logs {
#   #   bucket        = "cpm-flowlogs"
#   #   bucket_prefix = "bar"
#   #   interval      = 60
#   # }

#   listener {
#     instance_port     = 8000
#     instance_protocol = "http"
#     lb_port           = 80
#     lb_protocol       = "http"
#   }

#   listener {
#     instance_port      = 8000
#     instance_protocol  = "http"
#     lb_port            = 443
#     lb_protocol        = "https"
#     # ssl_certificate_id = "arn:aws:iam::123456789012:server-certificate/certName"
#   }

#   health_check {
#     healthy_threshold   = 2
#     unhealthy_threshold = 2
#     timeout             = 3
#     target              = "HTTP:8000/"
#     interval            = 30
#   }

#   instances                   = [aws_eks_cluster.cpm-staging-cluster.id]
#   cross_zone_load_balancing   = true
#   idle_timeout                = 400
#   connection_draining         = true
#   connection_draining_timeout = 400

#   tags = {
#     Name = "EKS ELB"
#   }
# }