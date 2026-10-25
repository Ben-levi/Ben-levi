terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }

  # Recommended: remote state so CI and your laptop share it.
  # Create the bucket once, then uncomment:
  # backend "s3" {
  #   bucket = "ben-levi-terraform-state"
  #   key    = "portfolio/terraform.tfstate"
  #   region = "eu-central-1"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "portfolio"
      ManagedBy = "terraform"
      Repo      = "Ben-levi/Ben-levi"
    }
  }
}

# CloudFront requires ACM certs & some resources in us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
