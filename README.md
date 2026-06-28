# Ansible Learning Lab

A self-contained, tabbed local website that teaches Ansible from the ground up — built for IT automation engineers.

## Open the Website

No server required. Double-click or open index.html file in any browser

Or on Linux:

```bash
xdg-open index.html
```

Your progress (sections visited) is saved in browser localStorage.

![Main Page](media/Main%20Page.png)

## What's Inside

| Section | Topics |
|---|---|
| **Foundations** | Architecture, install, inventory, ad-hoc commands |
| **Core Automation** | Playbooks, tasks, modules, variables, templates, roles |
| **Production** | Vault, collections, Controller/AWX, execution environments |
| **Reference** | Example projects, cheat sheet, official links |

## Example Projects

Study and run these against lab VMs (Vagrant, Multipass, etc.):

```bash
# Web server deployment (roles, templates, handlers)
cd examples/webserver-project
ansible-playbook site.yml --check --diff

# Patch management (conditionals, serial, reboot)
cd examples/patch-management
ansible-playbook patch-servers.yml --check -e "patch_category=security"

# Controller-ready layout (job template playbooks)
cd examples/controller-project
# See README.md for AWX/Controller mapping
```

Update inventory files with your VM IP addresses before running.

## Recommended Lab Setup

1. Install Ansible on your Mac: `brew install ansible`
2. Spin up 2 Linux VMs (Multipass: `multipass launch -n web01`)
3. Copy your SSH key: `ssh-copy-id ubuntu@<vm-ip>`
4. Edit `examples/webserver-project/inventories/production/hosts.yml`
5. Run: `ansible-playbook site.yml --check` then without `--check`

## File Structure

```
AnsibleLearningLab/
├── index.html          # Main learning website
├── css/styles.css
├── js/app.js
├── examples/
│   ├── webserver-project/    # Full role-based project
│   ├── patch-management/     # Patching playbook
│   └── controller-project/   # AWX/Controller layout
└── README.md
```

## External Resources

- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Automation Controller Guide](https://docs.ansible.com/automation-controller/latest/html/userguide/index.html)
