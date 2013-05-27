all:

publish:
	cd expo && npm publish
	cd expo-connect_assets && npm publish
	cd expo-sequelize && npm publish

PACKAGES := package.json $(shell find expo*/package.json)

# http://github.com/marksteve/bump
bump: $(PACKAGES)
	bump $^
bumpM: $(PACKAGES)
	bump -M $^
bumpm: $(PACKAGES)
	bump -m $^
	

.PHONY: publish bump
