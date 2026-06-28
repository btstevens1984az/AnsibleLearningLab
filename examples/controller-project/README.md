# Ansible Controller Project Layout

This directory is structured for import into **Ansible Automation Platform** (Controller) or **AWX**.

## Controller Setup Mapping

| Controller Object | Value |
|---|---|
| **Project (SCM)** | Point to this Git repo root |
| **Project Base Path** | `examples/controller-project` |
| **Execution Environment** | Build from `execution-environment.yml` |
| **Inventory** | `inventories/production/hosts.yml` |

## Job Templates to Create

| Job Template Name | Playbook | Inventory | Notes |
|---|---|---|---|
| Baseline - All Hosts | `playbooks/baseline.yml` | production | Run weekly |
| Deploy Nginx | `playbooks/deploy-nginx.yml` | production | Survey: port, workers |
| Patch Linux | `playbooks/patch-linux.yml` | production | Survey: category, reboot |

## Workflow Example

```
[Pre-check ping] → [Patch Linux] → [Post-patch verify]
       ↓ fail              ↓ fail
   [Notify ops]       [Rollback / alert]
```

## Before First Run

1. Copy roles from `../webserver-project/roles/` into this project's `roles/` directory
2. Update inventory IPs to match your lab VMs
3. Create Machine Credential (SSH key) in Controller
4. Create Vault Credential for encrypted group_vars
5. Build and register Execution Environment from `execution-environment.yml`

## AWX CLI Example

```bash
awx job_templates create \
  --name "Deploy Nginx" \
  --job_type run \
  --inventory "Production" \
  --project "Infrastructure Automation" \
  --playbook "playbooks/deploy-nginx.yml" \
  --execution_environment "infra-ee:latest"
```
