ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/repo/mk/js.common.node.mk
include support-firecloud/repo/mk/js.check.eslint.mk
include support-firecloud/repo/mk/js.publish.npg.mk

# ------------------------------------------------------------------------------

SF_VENDOR_FILES_IGNORE := \
	$(SF_VENDOR_FILES_IGNORE) \
	-e "^docs/demo.browserify.js" \

SF_ECLINT_FILES_IGNORE := \
	$(SF_ECLINT_FILES_IGNORE) \
	$(SF_VENDOR_FILES_IGNORE) \

SF_ESLINT_FILES_IGNORE := \
	$(SF_ESLINT_FILES_IGNORE) \
	$(SF_VENDOR_FILES_IGNORE) \

SF_BUILD_TARGETS := \
	$(SF_BUILD_TARGETS) \
	docs/demo.browserify.js \

BROWSERIFY = $(call npm-which,BROWSERIFY,browserify)

# ------------------------------------------------------------------------------

docs/demo.browserify.js: docs/demo.js
	$(BROWSERIFY) $< -o $@
