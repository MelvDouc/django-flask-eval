from django import forms


class CocktailRecipeForm(forms.ModelForm):
    ingredients = forms.CharField(
        widget=forms.Textarea,
        help_text="Enter one ingredient per line."
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = self.instance
        if instance and instance.pk:
            # Show ingredients as multiline text for editing
            self.initial["ingredients"] = "\n".join(instance.ingredients)

    def clean_ingredients(self):
        data = self.cleaned_data["ingredients"]
        return [line.strip() for line in data.splitlines() if line.strip()]
