git checkout main
git status

read -p "Git commit all to main? ([y]/n): " continue_input


if [[ $continue_input == *"n"* ]]; then
	echo "Not committing..."

else
	echo "Committing all to main..."
	read -p "Git commit message: " commit_msg_input
	git add .
	git commit -m "$commit_msg_input"
	git push

fi

read -p "Git merge to production branch? (y/[n]): " merge_production_input

if [[ $merge_production_input == *"y"* ]]; then
	echo "Merging to production..."
	git checkout production
	git merge main
	git push
	git checkout main

else
	echo "Not merging..."

fi

read -p "Press Enter to exit " # wait for user to press enter before exiting
