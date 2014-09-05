test:
	@node node_modules/lab/bin/lab test/app/
test-cov:
	@node node_modules/lab/bin/lab -t 100 test/app/
test-cov-html:
	@node node_modules/lab/bin/lab -r html -o coverage.html test/app/
.PHONY: test test-cov test-cov-html
