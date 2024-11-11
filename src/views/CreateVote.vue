<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-background" >
        <div class="w-full h-screen flex flex-col justify-center items-center bg-zinc-50">
            <div class="prose bg-white p-8 rounded-lg shadow-md max-w-2xl overflow-scroll">
                <div>
                    <el-form :model="votingForm" ref="vForm" :rules="rules" label-position="left" label-width="150px"
                        size="default" @submit.prevent>

                            <template #header>
                            <div class="clear-fix">
                                <span></span>
                            </div>
                            </template>
                            <el-form-item label="Voting Name" prop="voting_name" class="required label-right-align">
                                <el-input v-model="votingForm.voting_name" type="text" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="Voting Description" prop="voting_description" class="required label-right-align">
                                <el-input v-model="votingForm.voting_description" type="text" clearable></el-input>
                            </el-form-item>

                            <div class="static-content-item">
                                <el-divider direction="horizontal"></el-divider>
                            </div>
                            
                            <div>
                                <div v-for="(voting_option, index) in votingForm.voting_options" :key="index" >
                                <el-form :model="voting_option" label-width="120px"  :rules="formRules" label-position="left" size="default" @submit.prevent>
                                    <el-form-item :label="'Option ' + (index + 1)+ ' Title'" class="required label-right-align" prop="option_title">
                                        <el-input v-model="voting_option.option_title" type="text" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="Option Type" class="required label-right-align" prop="option_type">
                                        <el-radio-group v-model="voting_option.option_type">
                                            <el-radio label="singleChoice"  value="single">Single Choice</el-radio>
                                            <el-radio label="multipleChoice" value="multiply">Multiple choice</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="Choice 1" prop="list_title">
                                        <el-input v-model="voting_option.option_list.list_title1"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Choice 2" prop="list_title">
                                        <el-input v-model="voting_option.option_list.list_title2"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Choice 3" prop="list_title">
                                        <el-input v-model="voting_option.option_list.list_title3"></el-input>
                                    </el-form-item>

                                    <div class="static-content-item">
                                        <el-divider direction="horizontal"></el-divider>
                                    </div>
                                </el-form>
                                </div>

                            </div>

                            <el-button @click="addOption">Add Option</el-button>
                    </el-form>
                </div>

                    <div class="w-full flex flex-row-reverse">
                        <Button type="primary" @click="submitForm">Submit</Button>
                    </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useFetch } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
import { ref,reactive,getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/lib/utils'

const router = useRouter()
const checkboxLists = ref([])
const userId = useRouteParams('id')
const postUrl = `${API_URL}/create-voting`

const votingForm = reactive({
    voting_name:'',
    voting_description:'',
    status:'open',
    created_by: userId,
    voting_options:[
        {
            option_title:'',
            option_type:'',
            option_list:[
                { list_title1: '' },
                { list_title2: '' },
                { list_title3: '' }
            ]
        }

    ]
});

const rules = reactive({
    voting_name: [{
    required: true,
    message: 'Value cannot be null',
  }],
    voting_description: [{
    required: true,
    message: 'Value cannot be null',
  }]
})

const formRules = reactive({
    option_title: [{
    required: true,
    message: 'Value cannot be null',
  }],
    option_type: [{
    required: true,
    message: 'Value cannot be null',
  }]
})

const vForm = ref(null)

const resetForm = () => {
  vForm.value.resetFields()
}

const addOption = () => {
    const newIndex = votingForm.voting_options.length
    votingForm.voting_options.push({
            option_title:'',
            option_type:'',
            option_list:[
                { list_title1: '' },
                { list_title2: '' },
                { list_title3: '' }
            ],
            index: newIndex
        });
};

const submitData =() =>{
    const postData = {
        voting_name: votingForm.voting_name,
        voting_description: votingForm.voting_description,
        status: votingForm.status,
        created_by: votingForm.created_by,
        voting_options: votingForm.voting_options.map((voting_option, index) => ({
            option_title: voting_option.option_title,
            option_type: voting_option.option_type,
            option_list: [{
                list_title1: voting_option.option_list.list_title1,
                list_title2: voting_option.option_list.list_title2,
                list_title3: voting_option.option_list.list_title3,
            }]
        }))
        }
    
    return postData;
}

const submitForm = async() => {
    const valid = await vForm.value.validate();
    if (!valid) {
        return
    }

    const { postData, execute } = useFetch(postUrl, { immediate: false }).post(
        submitData()
    ).json()
    
    const res = await execute();
    if (res.code === 200) {
        toast.success('Create Successfully!')
        router.push('/');
    } else {
        toast.error('Create Unsuccessfully!')
    }
}


</script>
