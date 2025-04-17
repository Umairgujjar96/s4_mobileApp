
# data "terraform_remote_state" "vpc" {
#   backend = "remote"
#   config = {
#     # Update to your Terraform Cloud organization
#     organization = "Curexa"
#     workspaces = {
#       name = "cpm-staging"
#     }
#   }
# }

# #
# # EKS
# #
# module "eks" {
#   source  = "terraform-aws-modules/eks/aws"
#   version = "~> 18.0"

#   cluster_name                    = "cpm-staging-cluster"
#   cluster_version                 = "1.29"
#   cluster_endpoint_private_access = true
#   cluster_endpoint_public_access  = true

#   cluster_addons = {
#     coredns = {
#       most_recent = true
#       # resolve_conflicts_on_create = "OVERWRITE"
#       resolve_conflicts_on_update = "OVERWRITE"
#     }
#     kube-proxy = {
#       most_recent = true
#     }
#     vpc-cni = {
#       most_recent = true
#       # resolve_conflicts_on_create = "OVERWRITE"
#       resolve_conflicts_on_update = "OVERWRITE"
#     }
#   }

#   # cluster_encryption_config = [{
#   #   provider_key_arn = "ac01234b-00d9-40f6-ac95-e42345f78b00"
#   #   resources        = ["secrets"]
#   # }]

#   vpc_id     = "vpc-0fb37d16fde030b7b"
#   subnet_ids = ["subnet-072da4bb240614346", "subnet-083d81319ebe3de0e", "subnet-063941d3b1448a5a1"]
#   # subnet_ids = data.terraform_remote_state.vpc.outputs.public_subnets
#   # control_plane_subnet_ids = data.terraform_remote_state.vpc.outputs.public_subnets

#   # EKS Managed Node Group(s)
#   eks_managed_node_group_defaults = {
#     ami_type               = "AL2_x86_64"
#     disk_size              = 50
#     instance_types         = ["t3.small", "t3.medium", "t3.large", "m5.large"]
#     vpc_security_group_ids = ["sg-02ffa153f7f35cdbd"]
#   }

#   eks_managed_node_groups = {
#     cpm-staging = {
#       min_size     = 2
#       max_size     = 3
#       desired_size = 2

#       instance_types = ["t3.medium"]
#       capacity_type  = "ON_DEMAND"
#     }
#     # tags = local.tags
#   }

#   #   enable_cluster_creator_admin_permissions = true

#   #   access_entries = {
#   #     # One access entry with a policy associated
#   #       policy_associations = {
#   #         example = {
#   #           policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSViewPolicy"
#   #           access_scope = {
#   #             namespaces = ["default"]
#   #             type       = "namespace"
#   #           }
#   #         }
#   #       }
#   #     }
#   # cluster_security_group_id = ""


#   tags = local.tags
# }