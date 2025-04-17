output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "A list of private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "A list of public subnets"
  value       = module.vpc.public_subnets
}

output "cidr_blocks" {
  description = "vpc cidr block range"
  value       = module.vpc.vpc_cidr_block
}

# output "cluster_endpoint" {
#   value = module.eks.cluster_endpoint
# }

# output "cluster_certificate_authority_data" {
#   value = module.eks.cluster_certificate_authority_data
# }

# output "cluster_id" {
#   value = module.eks.cluster_id
# }

# output "cluster_oidc_issuer_url" {
#   value = module.eks.cluster_oidc_issuer_url
# }

output "s3_bucket_arn" {
  value = module.s3_bucket.s3_bucket_arn
}

output "s3_bucket_id" {
  value = module.s3_bucket.s3_bucket_id
}