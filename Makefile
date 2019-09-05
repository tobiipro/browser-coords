ifeq (,$(wildcard support-firecloud/Makefile))
INSTALL_SUPPORT_FIRECLOUD := $(shell git submodule update --init --recursive support-firecloud)
ifneq (,$(filter undefine,$(.FEATURES)))
undefine INSTALL_SUPPORT_FIRECLOUD
endif
endif

include support-firecloud/repo/mk/node.common.mk
include support-firecloud/repo/mk/js.check.eslint.mk
include support-firecloud/repo/mk/core.misc.release.npg.mk

# ------------------------------------------------------------------------------

BROWSERIFY = $(call npm-which,BROWSERIFY,browserify)

SF_VENDOR_FILES_IGNORE += \
	-e "^docs/.\+\.browserify\.js$$" \

SF_BUILD_TARGETS += \
	docs/play.browserify.js \
	docs/demo.browserify.js \

# ------------------------------------------------------------------------------

docs/%.browserify.js: docs/%.js
	$(BROWSERIFY) $< -o $@
