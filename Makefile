PACKAGES := package.json $(shell find expo*/package.json)

all:

link:
	cd expo && npm link
	cd expo-connect_assets && npm link
	cd expo-sequelize && npm link

publish:
	cd expo && npm publish
	cd expo-connect_assets && npm publish
	cd expo-sequelize && npm publish

site:
	[ -d $@ ] || git clone git@github.com:rstacruz/expo.git -b gh-pages $@

# http://github.com/marksteve/bump
bump: $(PACKAGES)
	bump $^
bumpM: $(PACKAGES)
	bump -M $^
bumpm: $(PACKAGES)
	bump -m $^
	

.PHONY: link publish bump bumpm bumpM
