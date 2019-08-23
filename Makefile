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
	-e "^priv/demo.browserify.js" \

SF_ECLINT_FILES_IGNORE := \
	$(SF_ECLINT_FILES_IGNORE) \
	$(SF_VENDOR_FILES_IGNORE) \

SF_ESLINT_FILES_IGNORE := \
	$(SF_ESLINT_FILES_IGNORE) \
	$(SF_VENDOR_FILES_IGNORE) \

SF_BUILD_TARGETS := \
	$(SF_BUILD_TARGETS) \
	priv/demo.browserify.js \

BROWSERIFY = $(call npm-which,BROWSERIFY,browserify)

# ------------------------------------------------------------------------------

priv/demo.browserify.js: priv/demo.js
	$(BROWSERIFY) $< -o $@
