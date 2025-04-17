resource "aws_ecr_repository" "scroll4-ecr" {
  name                 = "staging-ecr"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}