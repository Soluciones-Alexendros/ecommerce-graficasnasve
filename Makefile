# Contratos locales del canon P1: lint, test, smoke, validate.
# No sustituye a pnpm; envuelve los scripts de package.json.

.PHONY: lint test smoke validate validate-docs

CONTRACT_MDS := \
	README.md \
	AGENTS.md \
	ARCHITECTURE.md \
	SECURITY.md \
	CONTRIBUTING.md \
	CODE_OF_CONDUCT.md \
	SUPPORT.md \
	DECISIONS.md \
	DEPLOYMENT.md \
	docs/README.md \
	docs/guides/desarrollo.md \
	docs/guides/calidad.md \
	docs/guides/tienda.md \
	docs/runbooks/ci-deploy.md \
	docs/runbooks/presupuesto.md \
	docs/architecture/decisions/README.md \
	docs/architecture/decisions/0001-catalogo-estatico-en-codigo.md \
	.github/PULL_REQUEST_TEMPLATE.md \
	.github/ISSUE_TEMPLATE/bug.md \
	.github/ISSUE_TEMPLATE/feature.md

lint:
	pnpm typecheck
	pnpm lint
	pnpm format:check

test:
	pnpm test

smoke:
	pnpm test:e2e

validate-docs:
	@missing=0; \
	for f in $(CONTRACT_MDS); do \
		if [ ! -f "$$f" ]; then echo "Falta archivo contractual: $$f"; missing=1; continue; fi; \
		if ! grep -q '### Propósito de este documento' "$$f"; then \
			echo "Falta meta-sección «Propósito de este documento» en $$f"; \
			missing=1; \
		fi; \
	done; \
	if [ "$$missing" -ne 0 ]; then exit 1; fi; \
	echo "✓ Meta-secciones presentes en markdowns contractuales"

validate: lint test validate-docs
	@echo "✓ validate (lint + test + docs)"
